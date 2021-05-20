import { commandsHandler as CommandHandler } from "../handlers/commandsHandler";
import { IEnvironmentParams, IEvent } from "../handlers/eventHandler";
export class message implements IEvent {
    name: string;
    once: boolean;
    constructor() {
        this.name = "message"
        this.once = false;
    }
    async execute(environment: IEnvironmentParams, ...received: any[]) {
        const { client, prefix, collection, commandDirectory } = environment;
        const commandsHandler = new CommandHandler({ collection, commandDirectory });
        await commandsHandler.init(commandDirectory);
        commandsHandler.index({ client, prefix }, ...received);
    }
}