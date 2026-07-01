
console.log("browser:", typeof browser);
console.log("chrome:", typeof chrome);
console.log("storage:", browser?.storage);



console.log("popup loaded");

const bcolor = document.getElementById("bcolor");

console.log("bcolor element:", bcolor);

function updateColor() {
  console.log("COLOR PICKED:", bcolor.value);

  browser.storage.local.set({
    bcolor: bcolor.value
  });
}

bcolor.addEventListener("change", updateColor);


/*bcolor.addEventListener("click", () => console.log("CLICK"));
bcolor.addEventListener("focus", () => console.log("FOCUS"));
bcolor.addEventListener("input", () => console.log("INPUT"));
bcolor.addEventListener("change", () => console.log("CHANGE"));*/