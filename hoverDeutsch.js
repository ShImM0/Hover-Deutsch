
// Initialise variables
let lastWord = "";
let toolTipText;

document.addEventListener("mousemove", process);

async function process(e) {
  const word = getWord(e);

  if (word !== undefined && word !== lastWord) {

    console.log(word);
    lastWord = word;
    try {
      const germanInfo = await browser.runtime.sendMessage({
        type: "lookup",
        word
      });
      //await getMeaningOfWord(word);
      console.log("RESULT: ", germanInfo);
    } catch (err) {
      console.error("MESSAGE ERROR", err);
    }

  }
  //displayToolTipText(toolTipText);
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
  const response = await fetch(
    "https://api.pons.com/v1/dictionary?q=Haus&l=deen&in=de",
    {
      headers: {
        "X-Secret": "1443ad5671f44b1a72e1ecd9b4a51f22ec36792c72626e9735d5d9c583c5b11e"
      }
    }
  );

  const data = await response.json();
  console.log(data);
}


function displayToolTipText(toolTipText) {

}

