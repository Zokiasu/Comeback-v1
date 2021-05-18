export const queriesToDict = (queries) => {
  const order = queries.sortby?.split(':') || ['createdAt', 'DESC'];
  const limit = queries.limit;
  const offset = queries.offset;
  delete queries['sortby'];
  delete queries['limit'];
  delete queries['offset'];

  return { order: [order], limit, offset, where: queries };
};
