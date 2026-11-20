export function scrambledWordHunt(text: string, word: string): number[] {
  const m = word.length;
  if (m === 0 || m > text.length) return [];
  const need = new Array<number>(26).fill(0);
  const code = (s: string, i: number) => s.charCodeAt(i) - 97;
  for (let i = 0; i < m; i++) need[code(word, i)]++;
  let missing = need.filter((c) => c > 0).length; // letters not yet balanced
  const res: number[] = [];
  for (let r = 0; r < text.length; r++) {
    const add = code(text, r);
    if (--need[add] === 0) missing--;
    else if (need[add] === -1) missing++;
    if (r >= m) {
      const rem = code(text, r - m);
      if (++need[rem] === 0) missing--;
      else if (need[rem] === 1) missing++;
    }
    if (r >= m - 1 && missing === 0) res.push(r - m + 1);
  }
  return res;
}
