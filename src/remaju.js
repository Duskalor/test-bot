const URL = 'https://remaju.pj.gob.pe/remaju/pages/publico/remateExterno.xhtml';
const Moneda = {
  $: 'USD',
  'S/.': 'PEN',
};
const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRemajuData = async (context) => {
  const page = await context.newPage();
  try {
    await page.goto(URL);

    const dataScrapping = [];

    // Seleccionar el selector de opciones de página
    const SelectOptions = '.ui-paginator-rpp-options';
    await page.waitForSelector(SelectOptions);
    await page.selectOption(SelectOptions, { value: '12' });

    await wait(60000);

    // Obtener el número de páginas totales
    const TotalSelector = '.ui-paginator-bottom';
    await page.waitForSelector(TotalSelector);
    const totalEl = await page.$eval(TotalSelector, (el) => el.textContent);
    const rawTotal = totalEl.split('.')[0].match(/\d+/g)[0];
    const totalPages = Math.ceil(rawTotal / 12);
    console.log({ totalPages });

    for (let i = 1; i <= totalPages; i++) {
      console.log('escanneando la pagina: ', i);
      if (i > 1) {
        const pageSelector = '.ui-paginator-pages';
        await page.waitForSelector(pageSelector);

        const rawElements = await page.$(pageSelector);
        await rawElements.$$eval(
          'a',
          (elements, num) => {
            elements.forEach((el) => {
              const textContent = el.textContent.trim();
              if (textContent === num.toString()) {
                el.click();
              }
            });
          },
          i
        );
      }

      const gridSelector = '.ui-datagrid-column';
      await page.waitForSelector(gridSelector);
      const names = await page.$$eval(
        gridSelector,
        (elements, Moneda) => {
          return elements.map((el) => {
            const elem = el.querySelectorAll('.ui-panelgrid-cell');
            const price = elem[17].querySelectorAll('span');
            return {
              title: elem[3].textContent.trim(),
              type: elem[4].textContent.trim(),
              location: elem[6].textContent.trim(),
              ['Offer Date']: {
                date: elem[9].textContent.trim(),
                hour: elem[10].textContent.trim(),
              },
              process: elem[12].textContent.trim(),
              description: elem[16].textContent.trim(),
              price: {
                currency: Moneda[price[0].textContent.trim()],
                amount: price[1].textContent.trim(),
              },
            };
          });
        },
        Moneda
      );
      dataScrapping.push(...names);
      await wait(60000);
    }
    return dataScrapping;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await page.close();
  }
};
