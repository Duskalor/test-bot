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
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  );

  await page.goto(URL, {
    timeout: 60000,
    waitUntil: 'networkidle',
  });
  const a = await page.title();
  return a;
};
