import { createBot } from "../src/telegramBot";

describe("createBot", () => {
  test("should create a Telegraf bot instance", () => {
    const botToken = "test_bot_token";
    const bot = createBot(botToken);

    expect(bot).toBeInstanceOf(Object);
  });
});
