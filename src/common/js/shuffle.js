function random(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

export default function shuffle(arr) {
  const newArr = arr.slice();
  for (let i = 0; i < arr.length; i += 1) {
    const j = random(0, i);
    const t = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = t;
  }
  return newArr;
}
