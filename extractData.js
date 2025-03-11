import puppeteer from 'puppeteer-core';
const URL =
  'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'w3m',
  });

  const page = await browser.newPage();
  await page.goto(URL);
  const a = await page.title();
  return a;
};
