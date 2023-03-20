import { Telegraf } from "telegraf";
import { config } from "./config";
import logger from "./logger";
import { getDataAndGenerateMessages } from "./weather";

export const sendWeatherAlert = async (bot: Telegraf, chatId: string) => {
  const apiKey = config.OPENWEATHERMAP_API_KEY;
  const cityName = config.CITY_NAME;
  const countryCode = config.COUNTRY_CODE;
  const tempThreshold = config.TEMP_THRESHOLD;
  const windThreshold = config.WIND_THRESHOLD;

  logger.info("Sending daily weather notifications");
  const { tempMessage, windMessage } = await getDataAndGenerateMessages(
    apiKey,
    cityName,
    countryCode,
    tempThreshold,
    windThreshold
  );

  await bot.telegram.sendMessage(
    chatId,
    `🌤️ Good morning! Here is your daily weather update in ${cityName}:\n
    ${tempMessage}\n
    ${windMessage}`
  );
};
