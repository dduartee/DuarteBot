import { IEnvironmentParams, IEvent } from "../eventHandler";

export class ready implements IEvent {
    once: boolean;
    name: string;
    constructor() {
        this.name = "ready"
        this.once = true;
    }
    execute(environment: IEnvironmentParams, ...received: any[]): void {
        const { client } = environment;
        console.log('ready');
        console.log(client.user?.tag);
    }
}