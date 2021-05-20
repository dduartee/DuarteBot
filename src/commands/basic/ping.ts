import { Message } from "discord.js";
import { ICommand } from "../../commandsHandler";

class ping implements ICommand {
    name: string;
    description: string;
    constructor() {
        this.name = "ping";
        this.description = "Ping!"
    }
    execute(message: Message, args: any) {
        message.channel.send("Pong!")
    }
}

export { ping }