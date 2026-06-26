
// Initialise variables
let lastWord = "";
let hideTimeout = null;
let tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.background = "red";
tooltip.style.color = "#ffffff";
tooltip.style.padding = "6px";
tooltip.style.borderRadius = "5px";
tooltip.style.fontSize = "12px";
tooltip.style.pointerEvents = "none";
tooltip.style.zIndex = "999999";
tooltip.style.display = "none";
tooltip.style.width = "auto";
tooltip.style.textAlign = "left";
document.body.appendChild(tooltip);

document.addEventListener("mousemove", process);

/*
 * Asynchronous function because await is used
*/
async function process(e) {
  const word = getWord(e);

  if (!word) {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      tooltip.style.display = "none";
    }, 500);
    return;
  }

  if (word === lastWord) return;

  console.log(word);
  lastWord = word;

  try {
    // The background script has a Message Listener (browser.runtime.onMessage.addListener())
    const germanInfo = await getMeaningOfWord(word);

    displayTooltipText(germanInfo, e.clientX, e.clientY);

    //console.log("RESULT: ", germanInfo);

  } catch (err) {
    console.error("MESSAGE ERROR", err);
  }



}
/*
 *  The caretPositionFromPoint() method returns an object, containing the DOM node, the caret and caret's character offset within the node
 *  The caretRangeFromPoint() method does a similar thing
 */


function getWord(e) {

  let range;
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);

    if (!range) return;
    textNode = range.offsetNode;
    offset = range.offset;
  }
  else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(e.clientX, e.clientY);

    if (!range) return;
    textNode = range.startContainer;
    offset = range.startOffset;
  }
  else {
    return;
  }

  if (textNode?.nodeType !== Node.TEXT_NODE) return;
  // Only if the type of the node is text (.nodeType == 3)

  const text = textNode.textContent;


  // /\p{L}/u recognizes any letter
  // If current letter is undefined or not a letter or is blank, return
  if (!text[offset] || !/\p{L}/u.test(text[offset])) {
    return;
  }

  let start = offset;
  let end = offset;

  // Correct the indices for proper delimitation
  while (start > 0 && /\p{L}/u.test(text[start - 1])) {
    start--;
  }

  while (end < text.length && /\p{L}/u.test(text[end])) {
    end++;
  }

  // Remove blank spaces after the start and the end
  return text.slice(start, end);

}


async function getMeaningOfWord(word) {
  if (!word) return;
  const germanInfo = await browser.runtime.sendMessage({
    type: "lookup",
    word
  });

  return germanInfo;
}


function displayTooltipText(toolTipText, x, y) {
  tooltip.textContent = JSON.stringify(toolTipText);

  tooltip.style.left = x + 10 + "px";
  tooltip.style.top = y + 10 + "px";

  tooltip.style.display = "block";
}


