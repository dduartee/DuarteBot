import { Client, Collection } from "discord.js";
import { config } from "dotenv";
import path from "path";
import { eventHandler as EventHandler } from "./handlers/eventHandler";
config()

const collection = new Collection();
const client = new Client();

const commandDirectory = path.join(`${__dirname}/commands/`);
const eventDirectory = path.join(`${__dirname}/events/`);

const eventHandler = new EventHandler(collection, commandDirectory);
eventHandler.init(eventDirectory).then(() => eventHandler.index(client))

client.login(process.env.TOKEN)