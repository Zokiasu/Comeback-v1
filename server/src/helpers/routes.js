export const queriesToDict = (queries) => {
  const order = queries.sortby?.split(':') || ['createdAt', 'DESC'];
  const limit = queries.limit;
  const offset = queries.offset;
  delete queries['sortby'];
  delete queries['limit'];
  delete queries['offset'];

  return { order: [order], limit, offset, where: queries };
};

export const addAssociationItems = async (
  items,
  newItems,
  model,
  addItems,
  createItem,
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

    addItems(requestedItems);
  }

  if (newItems) {
    // creating new item and addig them
    for (const newItem of newItems) {
      createItem(newItem);
    }
  }
};
