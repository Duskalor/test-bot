import { supabase } from './lib/supabase.js';

export const saveDatabase = async (values) => {
  const { error: DeletedError } = await supabase
    .from('Elements')
    .delete({ count: 'exact' })
    .lt('created_at', '3000-01-01');

  if (DeletedError) return console.error('Error al borrar:', DeletedError);
  else console.log('Todos los datos eliminados de Elements');

  const { statusText, error } = await supabase.from('Elements').insert(values);
  if (error) {
    console.log(error);
  } else {
    console.log(
      `${statusText} \nCantidad de elmentos insertados: `,
      values.length
    );
  }
};
