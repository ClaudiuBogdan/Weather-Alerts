import logger from "./logger";
import { config } from "./config";
import { sendWeatherAlert } from "./weatherNotification";
import { createWeatherAlertBot } from "./weatherAlert";

const bot = createWeatherAlertBot(
    config.TELEGRAM_BOT_TOKEN,
    config.OPENWEATHERMAP_API_KEY,
    config.CITY_NAME,
    config.COUNTRY_CODE,
    config.TEMP_THRESHOLD,
    config.WIND_THRESHOLD,
    config.STRIPE_PROVIDER_TOKEN
  );
  
  bot.launch();
  
  logger.info("Weather Alert Bot started.");
  
  sendWeatherAlert(bot, config.TELEGRAM_CHAT_ID);
  
  process.on("SIGINT", () => {
    logger.info("Stopping Weather Alert Bot...");
    bot.stop();
    logger.info("Weather Alert Bot stopped.");
  
    process.exit();
  });