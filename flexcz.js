/*
Koncovky podle množství ve 4 plurálních formách
- 1 sg (1)
- 2 duál (2-4)
- 3 plurál (5+)
- 4 nula (0)
vzor: 
předmět[,y,ů] (předmět, předměty, předmětů)
akci[i,e,í] (akcii, akcie, akcií)
bot[u,y,,u] (botu, boty, bot, botu)

volání:

flex("Vlastníte [%] akci[i,e,í]", n)


npm init --scope=@adent
npm publish --access=public
*/


const flexParse = (pat) => {
  pat = pat.substr(1, pat.length - 2);
  let ptns = pat.split(",");
  if (ptns.length == 1) {
    ptns[1] = ptns[0];
  }
  if (ptns.length === 2) {
    ptns[2] = ptns[1];
  }

  if (ptns.length === 3) {
    ptns[3] = ptns[2];
  }
  return ptns;
};
const flex = (s, n) => {
  s = s.replace(/\[\%\]/g, n);
  let replacer = s.match(/\[.*?\]/g);
  if (replacer.length) {
    //replace one by one
    for (let pattern of replacer) {
      let ptns = flexParse(pattern);
      let val = ptns[n === 0 ? 3 : n === 1 ? 0 : n < 5 ? 1 : 2];
      s = s.replace(pattern, val);
    }
  }

  return s;
};
module.exports = flex;