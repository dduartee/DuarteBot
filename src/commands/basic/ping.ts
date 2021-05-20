import { Client, Message } from "discord.js";
import { ICommand } from "../../handlers/commandsHandler";

export class ping implements ICommand {
    name: string;
    description: string;
    constructor() {
        this.name = "ping";
        this.description = "Ping!"
    }
    execute(params: {message: Message, client: Client}, args: any) {
        const {message, client} = params
        const now = new Date().getTime();
        const past = new Date(message.createdAt).getTime();
        message.channel.send("Pong!")
        message.channel.send(`Latência: ${now - past}ms, Latência do bot: ${Math.round(client.ws.ping)}ms`)
    }
}