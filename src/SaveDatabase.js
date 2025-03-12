import { supabase } from './lib/supabase.js';

export const saveDatabase = async (data) => {
  const { error: DeletedError } = await supabase
    .from('Elements')
    .delete()
    .gt('id', 0);

  if (DeletedError) console.error('Error al borrar:', error);
  else console.log('Todos los datos eliminados de Elements');

  const { data: response, error } = await supabase
    .from('Elements')
    .insert(data);
  if (error) {
    console.log(error);
  } else {
    console.log('Cantidad de elmentos insertados: ', response.length);
  }
};
