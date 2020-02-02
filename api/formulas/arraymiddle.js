const arraymiddle = (array) => {
  return array.length % 2 === 0 ?
    `${array[Math.floor((array.length - 1) / 2)]} and ${array[Math.floor(array.length / 2)]}` :
    array[Math.floor(array.length / 2)];
}

module.exports = arraymiddle;
