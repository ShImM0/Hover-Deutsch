/*
 * API Query: Using parameter word, prepare URL with the correct header for request
 * 
 */
browser.runtime.onMessage.addListener(async (msg) => {
  // Input with {type: "lookup", word: "word"}
  if (msg.type !== "lookup") return;

  // encodeURIComponent ensures special chars are safely encoded
  const url = `https://api.pons.com/v1/dictionary?q=${encodeURIComponent(msg.word)}&l=deen&in=de`;

  try {
    // res is the variable that contains the response from the API
    // Sends and HTTP GET request to the API
    const res = await fetch(url, {
      headers: {
        "X-Secret": "1443ad5671f44b1a72e1ecd9b4a51f22ec36792c72626e9735d5d9c583c5b11e"
      }
    });

    console.log("STATUS:", res.status);

    // Response as a string
    const text = await res.text(); //comprobar .json
    console.log("RAW RESPONSE:", text);

    if (!res.ok) {
      return {
        error: true,
        status: res.status,
        body: text
      };
    }

    return JSON.parse(text);

  } catch (err) {
    console.error("FETCH FAILED:", err);

    return {
      error: true,
      message: err.message,
      stack: err.stack
    };
  }
});
