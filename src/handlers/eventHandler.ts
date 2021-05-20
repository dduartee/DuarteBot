import { Client, Collection, Message } from "discord.js";
import { readdirSync } from "fs";
import { ClassHandler } from "./classHandler";
import { prefix } from "../../config.json";

export interface IEvent {
    name: string;
    once: boolean;
    execute: (environment: IEnvironmentParams, ...received: any[]) => void;
}
export interface IEnvironmentParams {
    client: Client,
    prefix: string,
    collection: Collection<unknown, unknown>,
    commandDirectory: string
}
export class eventHandler {
    private events: IEvent[];
    collection: Collection<unknown, unknown>;
    commandDirectory: string;
    
    constructor(collection: Collection<unknown, unknown>, commandDirectory: string) {
        this.events = [];
        this.collection = collection;
        this.commandDirectory = commandDirectory;

    }
    async init(eventDirectory: string) {
        const eventFiles = readdirSync(eventDirectory)
        for (const eventFile of eventFiles) {
            const eventExports = await ClassHandler.import(eventFile, eventDirectory);
            for (const eventExport in eventExports) {
                if (Object.prototype.hasOwnProperty.call(eventExports, eventExport)) {
                    const event = ClassHandler.instance(eventExports, eventExport)
                    this.events.push(event)
                }
            }
        }
    }
    index(client: Client) {
        for (const event of this.events) {
            if (event.once) {
                client.once(event.name, (...received) => event.execute({ client, prefix, collection: this.collection, commandDirectory: this.commandDirectory }, ...received))
            } else {
                client.on(event.name, (...received) => event.execute({ client, prefix, collection: this.collection, commandDirectory: this.commandDirectory }, ...received))
            }
        }
    }
}