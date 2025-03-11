import puppeteer from 'puppeteer-core';
const URL =
  'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/data/data/com.termux/files/usr/bin/firefox',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
  });

  const page = await browser.newPage();
  await page.goto(URL);
  const a = await page.title();
  return a;
};
