console.log("popup.js loaded");
console.log("bcolor:", document.getElementById("bcolor"));
console.log("fcolor:", document.getElementById("fcolor"));

let bcolor = document.getElementById("bcolor");
bcolor.addEventListener("input", function() {
  sendColorChange("bcolor", bcolor.value);
})

let fcolor = document.getElementById("fcolor");
fcolor.addEventListener("input", function() {
  sendColorChange("fcolor", fcolor.value);
})


async function sendColorChange(id, color) {
  console.log("request for color change received");
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  switch (id) {
    case "bcolor":
      try{
        await browser.tabs.sendMessage(tab.id, {
          type: "background-color",
          color
        });
      }catch(e){
        console.log(e);
      }
      break;
    case "fcolor":
      await browser.tabs.sendMessage(tab.id, {
        type: "font-color",
        color
      });
      break;
  }

}


