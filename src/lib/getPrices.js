import { wait } from '../utils/wait.js';

const URL = 'https://chapacambio.com/';

export const getPrices = async (browser) => {
  const page = await browser.newPage();
  await page.goto(URL);
  wait(2000);
  try {
    await page.waitForSelector('.compra-venta');
    const values = page.locator('.compra-venta');

    const valuesPrices = await values.locator('label').evaluateAll((el) => {
      const prices = [];
      el.forEach((e) => {
        prices.push(e?.textContent ?? '');
      });
      return prices;
    });
    return valuesPrices.reduce((acc, value) => {
      const [key, price] = value.split(' ');
      acc[key.toLowerCase()] = price;
      return acc;
    }, {});
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await page.close();
  }
};
