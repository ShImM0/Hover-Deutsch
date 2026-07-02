
const bcolor = document.getElementById("bcolor");
const fcolor = document.getElementById("fcolor");
const translations = document.getElementById("translations");
const delay = document.getElementById("delay");
const detectionRadios = document.querySelectorAll('input[name="detection"]');

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

function updateTranslations(){
  console.log("TRANSLATIONS:", translations.checked);
 
  browser.storage.local.set({
    translations: translations.checked
  });
}
 
function updateDelay(){
  console.log("DELAY:", delay.value);
 
  browser.storage.local.set({
    delay: delay.value
  });
}

function updateDetection() {
  const selected = document.querySelector('input[name="detection"]:checked');
  if (!selected) return;
 
  console.log("DETECTION:", selected.value);
 
  browser.storage.local.set({
    detection: selected.value
  });
}


bcolor.addEventListener("change", updateBcolor);
fcolor.addEventListener("change", updateFcolor);
translations.addEventListener("change", updateTranslations);
delay.addEventListener("change", updateDelay);
detectionRadios.forEach((radio) => {
  radio.addEventListener("change", updateDetection);
});



