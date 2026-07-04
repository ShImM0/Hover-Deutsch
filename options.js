
const bcolor = document.getElementById("bcolor");
const fcolor = document.getElementById("fcolor");
const translations = document.getElementById("translations");
const delay = document.getElementById("delay");
const detectionRadios = document.querySelectorAll('input[name="detection"]');

/*
* Storage functions
*/

function updateBcolor() {

  browser.storage.local.set({
    bcolor: bcolor.value
  });
}
 
function updateFcolor() {

  browser.storage.local.set({
    fcolor: fcolor.value
  });
}

function updateTranslations(){

  browser.storage.local.set({
    translations: translations.checked
  });
}
 
function updateDelay(){

  browser.storage.local.set({
    delay: delay.value
  });
}

function updateDetection() {
  const selected = document.querySelector('input[name="detection"]:checked');
  if (!selected) return;

  browser.storage.local.set({
    detection: selected.value
  });
}


/*
* Event listeners
*/

bcolor.addEventListener("change", updateBcolor);
fcolor.addEventListener("change", updateFcolor);
translations.addEventListener("change", updateTranslations);
delay.addEventListener("change", updateDelay);
detectionRadios.forEach((radio) => {
  radio.addEventListener("change", updateDetection);
});



