export default function majOnFirstLetter(sentence) {
  // if all the letters are in CApital letters
  if (sentence !== sentence.toUpperCase()) {
    return sentence;
  }
  // seperate each word and apply a MAJ on the first letter of each word
  sentence = sentence.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i].charAt(0).toUpperCase() + sentence[i].slice(1);
  }
  sentence = sentence.join(" ");
  return sentence;
}
