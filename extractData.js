import { chromium } from 'playwright';
const URL = 'https://appstorrent.org/info-activation/ked-by-monter-group/';
// const URL =
//   'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async () => {
  const browser = await chromium.launch({
    headless: true,
    // args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto(URL);
  const a = await page.title();
  return a;
};
