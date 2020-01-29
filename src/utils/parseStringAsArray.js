const parseStringAsArray = (arrayAsString) => arrayAsString.split(',')
  .map((element) => element.trim());

export default parseStringAsArray;
