/*
* When the element is clicked, opens the settings page
*/

document.getElementById("settings").addEventListener("click", () => {
  browser.runtime.openOptionsPage();
});
