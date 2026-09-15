console.log("---- Hola mundo NODE ----");

let edad1=20;
let edad2=7;

console.log("Edad promedia:");
console.log((edad1+edad2) / 2);

console.log("----Medir Procesos ----");

console.time("MiProceso");
  for(i=0;i < 1000000000; i++){}
console.timeEnd("MiProceso");
