let bcolor = document.getElementById("bcolor");
bcolor.addEventListener("input", function(){
  tooltip.style.background = bcolor.value;
})

let fcolor = document.getElementById("fcolor");
fcolor.addEventListener("input", function(){
  tooltip.style.color = fcolor.value;
})
