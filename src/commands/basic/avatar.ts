import { Client, Message } from "discord.js";
import { ICommand } from "../../handlers/commandsHandler";

export class avatar implements ICommand {
    name: string;
    description: string;
    constructor() {
        this.name = 'avatar';
        this.description = 'Retorna informações do usuario'
    }
    execute(params: {message: Message, client: Client}, args: any[]): void {
        let avatarList;
        const {client, message} = params;
        if (!message.mentions.users.size) {
            const user = message.author;
            const { tag } = user;
            const avatarURL = user.displayAvatarURL({ format: "png", dynamic: true })
            avatarList = `Avatar do ${tag} : ${avatarURL}`
        } else {
            avatarList = message.mentions.users.map(user => {
                const { tag } = user;
                const avatarURL = user.displayAvatarURL({ format: "png", dynamic: true })
                return `Avatar do ${tag} : ${avatarURL}`;
            });
        }
        message.channel.send(avatarList);
        return;
    }

}