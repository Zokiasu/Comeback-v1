import { Op } from 'sequelize';

export function removeDuplicates(data, key) {
  return [...new Map(data.map((item) => [key(item), item])).values()];
}

export const queriesToDict = (queries, whereOptions = {}) => {
  const order = queries.sortby?.split(':') || ['createdAt', 'DESC'];
  const limit = queries.limit;
  const offset = queries.offset;
  const op = queries.op;
  delete queries['sortby'];
  delete queries['limit'];
  delete queries['offset'];
  delete queries['op'];

  if (op === 'like') {
    for (const [key, value] of Object.entries(queries)) {
      queries[key] = { [Op.substring]: value };
    }
  }

  return {
    order: [order],
    limit,
    offset,
    where: { ...queries, ...whereOptions },
  };
};

export const addAssociationItems = async (
  items,
  newItems,
  model,
  addItems,
  createItem,
  createIfNotExists = false,
  key = 'name',
) => {
  // setting exisiting
  if (items) {
    const ids = [];
    for (const tmpItem of items) {
      ids.push(tmpItem['id']);
    }
    const requestedItems = await model.findAll({
      where: { id: ids },
    });

    await addItems(requestedItems);
  }

  const findOrCreateItems = [];
  if (newItems) {
    // creating new item and addig them
    for (const newItem of newItems) {
      if (createIfNotExists) {
        const [item, created] = await model.findOrCreate({
          where: { [key]: newItem[key] },
        });
        findOrCreateItems.push(item);
      } else {
        await createItem(newItem);
      }
    }
  }

  if (findOrCreateItems.length) {
    await addItems(
      removeDuplicates(findOrCreateItems, (item) => item.id),
    );
  }
};
