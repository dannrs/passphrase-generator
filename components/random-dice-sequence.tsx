export default function RandomDiceSequence(n: number): string {
  let output = "";

  for (let i = 0; i < 6; i++) {
    let result = "";
    for (let j = 0; j < n; j++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      result += randomNumber;
    }
    output += result + " ";
  }
  return output;
}