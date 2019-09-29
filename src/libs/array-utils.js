export const uniqueByAttribute = function(array, attribute) {
  return array.filter((obj, pos, array) => {
    return array.map(mapObj => mapObj[attribute]).indexOf(obj[attribute]) === pos;
  });
};
