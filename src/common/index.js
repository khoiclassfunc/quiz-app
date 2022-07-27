export const checkStt = (stt) => {
  switch (stt) {
    case 0:
      return "a";
    case 1:
      return "b";
    case 2:
      return "c";
    case 3:
      return "d";
    default:
      break;
  }
};

export const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = randomNumber(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const randomArray = (numArr, numRan) => {
  let arr = [];
  for (let i = 0; i < numArr; i++) {
    arr.push(i);
  }

  let newArr = shuffle(arr);

  if (numRan >= numArr) return newArr;

  return newArr.slice(0, numRan);
};
