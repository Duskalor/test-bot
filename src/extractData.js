const URL =
  'https://whatsup.es/blog/los-20-phrasal-verbs-mas-usados-con-ejemplos';
// const URL =
//   'https://www.convocatoriasdetrabajo.com/buscar-empleo.php?q=informatica&dep=7';

export const getData = async (context) => {
  const page = await context.newPage();
  try {
    await page.goto(URL);
    return await page.title();
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
  }
};
