const pi = 3.14;
console.log(pi);
if (pi === 3.14) {
  console.log(pi);
  let phi = 2.72;
}
let symbol = Symbol("dog");
console.log(symbol);
console.log(typeof symbol);
let hex = 0x10877FAACBD;
console.log(hex);
let anibal = "paimon tiene el medio"
let poto = "poto"
let ggwp = `${anibal} ${poto}`;
console.log(ggwp);

console.log(null == undefined);
console.log(null !== undefined);

let paimon = {
  name: "Paimon",
  age: 5,
  isFlying: true
}   

console.log(`paimon vuela ${paimon.isFlying}`);
paimon.isFlying = false;
console.log(`paimon ya no vuela ${paimon.isFlying}`);