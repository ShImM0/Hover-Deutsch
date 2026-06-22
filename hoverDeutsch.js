
// Initialise variables
let word;
let toolTipText;

document.addEventListener("mousemove", process);

function process(e) {
  getWord(e);
  //getMeaningOfWord(word);
  //displayToolTipText(toolTipText);
}
/*
 *  The caretPositionFromPoint() method returns an object, containing the DOM node, the caret and caret's character offset within the node
 *  The caretRangeFromPoint() method does a similar thing
 */
function getWord(e) {
  let range;
  let textNode;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    textNode = range.offsetNode;
  }
  else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    textNode = range.startContainer;
  }
  else {
    return;
  }

  if (textNode?.nodeType === 3) {
    // Only if the type of the node is text (.nodeType == 3)
    word = textNode.textContent;
    console.log(`Parsed: ${word}`);
  }
}

function getMeaningOfWord(word) {

}

function displayToolTipText(toolTipText) {

}

