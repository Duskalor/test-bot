import puppeteer from 'puppeteer-core';
const URL =
  'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(URL);
  const a = await page.title();
  return a;
};
