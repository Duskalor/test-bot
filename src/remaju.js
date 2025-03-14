import { GetRandomTime } from './lib/randomTime.js';

const URL = 'https://remaju.pj.gob.pe/remaju/pages/publico/remateExterno.xhtml';
const Moneda = {
  $: 'USD',
  'S/.': 'PEN',
};
const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRemajuData = async (context) => {
  const page = await context.newPage();
  const dataScrapping = [];
  try {
    await page.goto(URL);

    // Seleccionar el selector de opciones de página
    const SelectOptions = '.ui-paginator-rpp-options';
    await page.waitForSelector(SelectOptions);
    await page.selectOption(SelectOptions, { value: '12' });

    await wait(GetRandomTime());

    // Obtener el número de páginas totales
    const TotalSelector = '.ui-paginator-bottom';
    await page.waitForSelector(TotalSelector);
    const totalEl = await page.$eval(TotalSelector, (el) => el.textContent);
    const rawTotal = totalEl.split('.')[0].match(/\d+/g)[0];
    const totalPages = Math.ceil(rawTotal / 12);
    console.log({ totalPages });

    // for (let i = 1; i <= totalPages; i++) {
    //   console.log('escanneando la pagina: ', i);
    //   if (i > 1) {
    //     const pageSelector = '.ui-paginator-pages';
    //     await page.waitForSelector(pageSelector);

    //     const rawElements = await page.$(pageSelector);
    //     await rawElements.$$eval(
    //       'a',
    //       (elements, num) => {
    //         elements.forEach((el) => {
    //           const textContent = el.textContent.trim();
    //           if (textContent === num.toString()) {
    //             el.click();
    //           }
    //         });
    //       },
    //       i
    //     );
    //   }

    //   const gridSelector = '.ui-datagrid-column';
    //   await page.waitForSelector(gridSelector);
    //   const names = await page.$$eval(
    //     gridSelector,
    //     (elements, Moneda) => {
    //       return elements.map((el) => {
    //         const elem = el.querySelectorAll('.ui-panelgrid-cell');
    //         const price = elem[17].querySelectorAll('span');
    //         return {
    //           title: elem[3].textContent.trim(),
    //           type: elem[4].textContent.trim(),
    //           location: elem[6].textContent.trim(),
    //           ['Offer Date']: {
    //             date: elem[9].textContent.trim(),
    //             hour: elem[10].textContent.trim(),
    //           },
    //           process: elem[12].textContent.trim(),
    //           description: elem[16].textContent.trim(),
    //           price: {
    //             currency: Moneda[price[0].textContent.trim()],
    //             amount: price[1].textContent.trim(),
    //           },
    //         };
    //       });
    //     },
    //     Moneda
    //   );
    //   dataScrapping.push(...names);
    //   await wait(60000);
    // }

    for (let i = 1; i <= totalPages; i++) {
      try {
        console.log('Escaneando la página:', i);

        if (i > 1) {
          const pageSelector = '.ui-paginator-pages';
          const foundSelector = await page
            .waitForSelector(pageSelector)
            .catch(() => {
              console.warn(`No se encontró el paginador en la página ${i}`);
              return;
            });

          if (!foundSelector) continue;

          const rawElements = await page.$(pageSelector);
          if (rawElements) {
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
          } else {
            console.warn(
              `No se encontraron enlaces de paginación en la página ${i}`
            );
            continue;
          }
        }

        const gridSelector = '.ui-datagrid-column';
        const foundGrid = await page.waitForSelector(gridSelector).catch(() => {
          console.warn(`No se encontró la tabla de datos en la página ${i}`);
          return;
        });
        if (!foundGrid) continue;

        const names = await page.$$eval(
          gridSelector,
          (elements, Moneda) => {
            return elements
              .map((el) => {
                try {
                  const elem = el.querySelectorAll('.ui-panelgrid-cell');
                  const price = elem[17]?.querySelectorAll('span');
                  if (!price || price.length < 2)
                    throw new Error('Precio no encontrado');

                  return {
                    title: elem[3]?.textContent?.trim() || 'N/A',
                    type: elem[4]?.textContent?.trim() || 'N/A',
                    location: elem[6]?.textContent?.trim() || 'N/A',
                    ['Offer Date']: {
                      date: elem[9]?.textContent?.trim() || 'N/A',
                      hour: elem[10]?.textContent?.trim() || 'N/A',
                    },
                    process: elem[12]?.textContent?.trim() || 'N/A',
                    description: elem[16]?.textContent?.trim() || 'N/A',
                    price: {
                      currency: Moneda[price[0]?.textContent?.trim()] || 'N/A',
                      amount: price[1]?.textContent?.trim() || 'N/A',
                    },
                  };
                } catch (err) {
                  console.warn(
                    'Error procesando un elemento de la tabla:',
                    err.message
                  );
                  return null;
                }
              })
              .filter((item) => item !== null);
          },
          Moneda
        );

        if (names.length > 0) {
          dataScrapping.push(...names);
          console.log(
            `cantidad de datos obtenidos : ${names.length} de la pagina ${i}`
          );
        } else {
          console.warn(`No se extrajeron datos en la página ${i}`);
        }

        await wait(GetRandomTime());
      } catch (error) {
        console.error(`Error en la página ${i}:`, error.message);
      }
    }

    return dataScrapping;
  } catch (error) {
    console.log(error);
    return dataScrapping;
  } finally {
    await page.close();
  }
};
