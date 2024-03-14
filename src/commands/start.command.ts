import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "@/context/context.interface";
import { TYPES } from '@/types-di';

@injectable()
export class StartCommand extends Command {
  constructor(@inject(TYPES.Bot) bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply("Works")
    })
  }
}