import { chromium } from 'playwright';
import { getRandomUserAgent } from './userAgent.js';

export const newContext = async () => {
  const browser = await chromium.launch({
    // eslint-disable-next-line no-undef
    headless: !(process.env.ITS_DEVELOPMENT === 'true'),
  });
  return await browser.newContext({
    userAgent: getRandomUserAgent(),
  });
};
