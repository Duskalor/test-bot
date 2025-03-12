import { chromium } from 'playwright';
const URL =
  'https://whatsup.es/blog/los-20-phrasal-verbs-mas-usados-con-ejemplos';
// const URL =
//   'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async () => {
  console.log('1');
  const browser = await chromium.launch({
    headless: true,
    // args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('2');
  // const page = await browser.newPage();
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
  });
  console.log('3');
  // Create a new page in the browser context and navigate to target URL
  const page = await context.newPage();
  await page.goto(URL, {
    timeout: 60000,
    waitUntil: 'load',
  });
  console.log('4');
  const a = await page.title();
  browser.close();
  return a;
};
