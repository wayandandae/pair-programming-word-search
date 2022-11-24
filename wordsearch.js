// transpose a 2D array diagonally, then return an array with its width and length switched
const transpose = matrix => {
  // create a variable to hold the resulting array
  const result = [];
  // error message for different array length than the first array
  const lError = "Every array's length should match the length of the first array. Please try again.";
  // number of elements of the first array as matrix width
  const matrixW = matrix[0].length;
  // number of arrays as matrix height
  const matrixH = matrix.length;

  // iterate through each array
  matrix.forEach(array => {
    // if the length of another array is different than matrix width, throw the error message
    if (array.length !== matrixW) throw new Error(lError);
  });

  // iterate through each array, until width of array is reached
  for (let i = 0; i < matrixW; i++) {
    // create a varaible to hold each line of array
    result[i] = [];
    // iterate through each element of array, until height of array
    for (let j = 0; j < matrixH; j++) {
      // push element of matching index from each array
      result[i].push(matrix[j][i]);
    }
  }

  // return the resulting transposed array
  return result;
};

// add backward string values to array
const addBWard = array => {
  // for every string item of array
  array.forEach(string => {
    // if string length is longer than 1, push the item in reverse order
    if (string.length > 1) array.push(string.split('').reverse().join(''));
  });

  return array;
};

// return all diagonal strings of 2D array
const diagonalString = letters => {
  // define horizontal length as width
  const width = letters[0].length;
  // define vertical length as height
  const height = letters.length;
  // create an array variable to hold diagonal strings
  const result = [];
  // create a variable to hold starting indices of letters
  const dIndex = [];

  // helper function to add a diagonal line of string to result array
  const diagonalHelper = (index, direction) => {
    // if string direction is right or left, index either increments or decrements
    const multiple = direction === "right" ? 1 : -1;
    // create a variable to hold a line of string
    const line = [];
  
    for (let j = 0; j < Math.max(width, height) - 1; j++) {
      // array index will always increment in both right or left directions
      const arrayIndex = index[0] + j;
      // item index will increment or decrement depending on the direction of string
      const itemIndex = index[1] + multiple * j;
      // check if the index exists within the 2D array
      if (Array.isArray(letters[arrayIndex]) && itemIndex >= 0 && itemIndex < width) {
        // push the letter into line array
        line.push(letters[arrayIndex][itemIndex]);
      } else break;
    }
    // concatenate the array elements and add to result
    result.push(line.join(''));
  };

  // iterate through top, left, right sides of 2D array
  for (let i = 0; i < width + height * 2 - 2; i++) {
    if (i < width) {
      // push every item of first array as starting index
      dIndex.push([0, i]);
      // find both left-to-right and right-to-left diagonal string lines
      diagonalHelper(dIndex[i], "right");
      diagonalHelper(dIndex[i], "left");
    } else if (i < width + height - 1) {
      // after dIndex reaches [0, width], push the first items of arrays
      dIndex.push([i - width + 1, 0]);
      // only find left-to-right lines starting from dIndex
      diagonalHelper(dIndex[i], "right");
    } else {
      // after dIndex reaches [height, 0], push the last items of arrays
      dIndex.push([i - width - height + 2, width]);
      // only find right-to-left lines
      diagonalHelper(dIndex[i], "left");
    }
  }

  return result;
};

// search for word from letters 2D array
const wordSearch = (letters, word) => {
  // create a flag to tell whether the word is found or not
  let wordFound = false;
  // if letters is not a 2D array or word is a falsy value, return false
  if (!Array.isArray(letters[0]) || !word) return false;

  // all horizontal string values of letters array, including reversed strings
  const horizontalJoin = addBWard(letters.map(ls => ls.join('')));
  // all vertical string values
  const verticalJoin = addBWard(transpose(letters).map(ls => ls.join('')));
  // all diagonal string values
  const diagonalJoin = addBWard(diagonalString(letters));
  // set all joint string values in one array
  const joins = [horizontalJoin, verticalJoin, diagonalJoin];

  // iterate through each array of string
  joins.forEach(direction => {
    // for each line of string,
    for (const line of direction) {
      // if the word is found, flag becomes true
      if (line.includes(word)) wordFound = true;
    }
  });

  // if the word is not found, function will return the original false flag
  return wordFound;
};


module.exports = wordSearch;