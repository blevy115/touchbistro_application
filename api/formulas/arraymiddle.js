const arraymiddle = (array) => {
  if (array.length % 2 === 0) {
    return `${array[Math.floor((array.length - 1) / 2)]} and ${array[Math.floor(array.length / 2)]}`
  } else {
    return array[Math.floor(array.length / 2)];
  }
}

module.exports = arraymiddle;
