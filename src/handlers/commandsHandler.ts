import { Client, Collection, Message } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { ClassHandler } from "./classHandler";
export interface ICommand {
    name: string;
    description: string;
    execute(params: {message: Message, client: Client}, args: any[]): void
}
export class commandsHandler {
    collection: Collection<unknown, unknown>;
    commandsFolder: string;
    constructor(params: { collection: Collection<unknown, unknown>, commandDirectory: string }) {
        const { collection, commandDirectory } = params;
        this.collection = collection;
        this.commandsFolder = commandDirectory;
    }
    async init(commandDirectory: string) {
        const categoriesFolders = readdirSync(commandDirectory); // pastas das categorias
        for (const categoryFolder of categoriesFolders) {
            const categoryFiles = readdirSync(commandDirectory + categoryFolder); // arquivos de categoria
            for (const categoryFile of categoryFiles) {
                const fileExports = await ClassHandler.import(categoryFile, path.join(commandDirectory + categoryFolder)); // exports do arquivo
                for (const fileExport in fileExports) {
                    if (Object.prototype.hasOwnProperty.call(fileExports, fileExport)) {
                        const command = ClassHandler.instance(fileExports, fileExport); // instancia o export do arquivo
                        this.collection.set(command.name, command);
                    }
                }
            }
        }
    }
    index(environment: { client: Client, prefix: string }, ...received: any[]) {
        const { client, prefix } = environment;
        const message: any = received[0];
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();
        const exists = this.collection.has(commandName)
        if (!exists) return;

        try {
            const command = this.collection.get(commandName) as ICommand;
            console.log("Execute: " + command.name);
            command.execute({message, client}, args)
        } catch (error) {
            console.error(error)
        }
    }

}
