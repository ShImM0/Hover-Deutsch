
/*console.log("browser:", typeof browser);
console.log("chrome:", typeof chrome);
console.log("storage:", browser?.storage);
console.log("popup loaded");*/

const bcolor = document.getElementById("bcolor");
const fcolor = document.getElementById("fcolor");

console.log("bcolor element:", bcolor);
console.log("fcolor element:", fcolor);

function updateBcolor() {
  console.log("BCOLOR PICKED:", bcolor.value);
 
  browser.storage.local.set({
    bcolor: bcolor.value
  });
}
 
function updateFcolor() {
  console.log("FCOLOR PICKED:", fcolor.value);
 
  browser.storage.local.set({
    fcolor: fcolor.value
  });
}
 
bcolor.addEventListener("change", updateBcolor);
fcolor.addEventListener("change", updateFcolor);
 
