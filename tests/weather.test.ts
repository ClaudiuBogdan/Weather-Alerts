import { generateWeatherMessages } from '../src/weather';

describe('generateWeatherMessages', () => {
  const tempThreshold = 20;
  const windThreshold = 10;

  test('should generate temperature and wind messages when both are within thresholds', () => {
    const { tempMessage, windMessage } = generateWeatherMessages(22, 8, tempThreshold, windThreshold);

    expect(tempMessage).toBe('🌡️ The temperature minimum for today is 22°C.');
    expect(windMessage).toBe('💨 The wind speed for today is 8 m/s.');
  });

  test('should generate temperature and wind messages when both thresholds are exactly met', () => {
    const { tempMessage, windMessage } = generateWeatherMessages(20, 10, tempThreshold, windThreshold);

    expect(tempMessage).toBe('🌡️ The temperature minimum for today is 20°C.');
    expect(windMessage).toBe('💨 The wind speed for today is 10 m/s.');
  });

  test('should generate temperature and wind messages when only temperature is below the threshold', () => {
    const { tempMessage, windMessage } = generateWeatherMessages(18, 8, tempThreshold, windThreshold);

    expect(tempMessage).toBe(`⚠️ The temperature minimum for today is 18°C, which is below the threshold of ${tempThreshold}°C.`);
    expect(windMessage).toBe('💨 The wind speed for today is 8 m/s.');
  });

  test('should generate temperature and wind messages when only wind is above the threshold', () => {
    const { tempMessage, windMessage } = generateWeatherMessages(22, 12, tempThreshold, windThreshold);

    expect(tempMessage).toBe('🌡️ The temperature minimum for today is 22°C.');
    expect(windMessage).toBe(`⚠️ The wind speed for today is 12 m/s, which is above the threshold of ${windThreshold} m/s.`);
  });

  test('should generate temperature and wind warnings when both thresholds are exceeded', () => {
    const { tempMessage, windMessage } = generateWeatherMessages(18, 12, tempThreshold, windThreshold);

    expect(tempMessage).toBe(`⚠️ The temperature minimum for today is 18°C, which is below the threshold of ${tempThreshold}°C.`);
    expect(windMessage).toBe(`⚠️ The wind speed for today is 12 m/s, which is above the threshold of ${windThreshold} m/s.`);
  });
});
