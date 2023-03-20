import { Telegraf } from 'telegraf';

export const createBot = (botToken: string) => {
  return new Telegraf(botToken);
};
