import Item from '../models/item';

/**
 * Listar items.
 *
 * @return {Promise}
 */
export async function listItems() {
  // Devuelve de la colección item todos los registros
  return Item.find();
}

/**
 * Crea un nuevo item.
 *
 * @param  {Object}  data
 * @return {Promise}
 */
export async function createItem(data) {
  let item = new Item();

  item.title = data.title;

  // Crea un nuevo registro en la colección item
  return await item.save();
}
