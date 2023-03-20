import logger from "./logger";
import { getWeatherData, generateWeatherMessages } from "./weather";
import { createBot } from "./telegramBot";
import { createInvoice } from "./payment";

export const createWeatherAlertBot = (
  botToken: string,
  apiKey: string,
  cityName: string,
  countryCode: string,
  tempThreshold: number,
  windThreshold: number,
  providerToken: string
) => {
  const bot = createBot(botToken);

  bot.start((ctx) => {
    ctx.reply(
      "Welcome to the Weather Alert Bot! To access premium features, use the /subscribe command."
    );
  });

  bot.command("weather", async (ctx) => {
    const chatId = ctx.chat.id;

    try {
      const weatherData = await getWeatherData(apiKey, cityName, countryCode);
      const minTemp = weatherData.main.temp_min;
      const windSpeed = weatherData.wind.speed;

      const { tempMessage, windMessage } = generateWeatherMessages(
        minTemp,
        windSpeed,
        tempThreshold,
        windThreshold
      );

      ctx.reply(tempMessage);
      ctx.reply(windMessage);

      logger.info(`Sent weather alert to chat ID ${chatId}`);
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error(`Failed to fetch weather data: ${errorMessage}`);
      ctx.reply(
        "An error occurred while fetching the weather data. Please try again later."
      );
    }
  });

  bot.command("subscribe", async (ctx) => {
    const invoice = createInvoice(
      "Weather Alert Premium Subscription",
      "Subscribe to our premium weather alerts.",
      "premium_subscription",
      providerToken,
      "premium_subscribe",
      "USD",
      [{ label: "1 Month Subscription", amount: 500 }]
    );

    await ctx.replyWithInvoice(invoice);
  });

  bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true));

  bot.on("successful_payment", async (ctx) => {
    // Handle successful payment, e.g., add the user to the premium group, update the subscription status, etc.
    await ctx.reply(
      "Thank you for your payment! You are now subscribed to our premium weather alerts."
    );
  });

  return bot;
};

const OPENWEATHERMAP_API_KEY = "your_openweathermap_api_key";
const TELEGRAM_BOT_TOKEN = "your_telegram_bot_token";
const STRIPE_PROVIDER_TOKEN = "your_stripe_provider_token";
const CITY_NAME = "your_city_name";
const COUNTRY_CODE = "your_country_code";
const TEMP_THRESHOLD = 20;
const WIND_THRESHOLD = 10;

const bot = createWeatherAlertBot(
  TELEGRAM_BOT_TOKEN,
  OPENWEATHERMAP_API_KEY,
  CITY_NAME,
  COUNTRY_CODE,
  TEMP_THRESHOLD,
  WIND_THRESHOLD,
  STRIPE_PROVIDER_TOKEN
);

bot.launch();

logger.info("Weather Alert Bot started.");

process.on("SIGINT", () => {
  logger.info("Stopping Weather Alert Bot...");
  bot.stop();
  logger.info("Weather Alert Bot stopped.");

  process.exit();
});
