/*
 * Waits for the lookup request, and sends the request using fetch
 * API Query: Using parameter word, prepare URL with the correct header for request
 * The response is a JSON, the result is the parsed string
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
            "X-Secret": "YOUR API KEY"
          }
        });

        console.log("STATUS:", res.status);

        // Response as a json
        const text = await res.json();

        if (!res.ok) {
          return {
            error: true,
            status: res.status,
            body: text
          };
        }

        const parsed = parseQuery(text);
        return parsed;

      } catch (err) {
        console.error("FETCH FAILED:", err);

        return {
          error: true,
          message: err.message,
          stack: err.stack
        };
      }



});

/*
 * Returns the string in a YAML-like string, using clean()
 */
function parseQuery(response) {
  //let result = [];
  let resultString = "";
  for (const languageDir of response) {
    resultString += (`language: ${languageDir.lang}\n`);

    let translations = [];
    let entries = [];
    for (const hit of languageDir.hits) {
      switch (hit.type) {
        case "entry":
          const entry = parseEntry(hit);
          resultString += entry;
          break;

        /*case "translation":
          translations.push(parseTranslation(hit));
          break;*/
      }
    }
    /*result.push({
      lang: languageDir.lang,
      entries,
      translations
    });*/
  }
  console.log(resultString);
  return resultString;
}

// Formatted parsing
function parseEntry(hitEntry) {
  let out = "";

  for (const rom of hitEntry.roms) {
    out += `  - headword: ${rom.headword}\n`;
    out += `    wordclass: ${rom.wordclass}\n`;
    out += `    senses:\n`;

    for (const arab of rom.arabs) {
      out += `       ${clean(arab.header)}\n`;

      for (const tr of arab.translations) {
        //out += `          - ${clean(tr.source)}\n`;
        out += `          - ${clean(tr.source)} -> ${clean(tr.target)}\n`;
      }
    }

    out += "\n";
  }

  return out;
}

/* Removes the HTML tags, changing span of class "collocator" to be wrapped in parenthesis
* (.*?) captures the content of the span
* "($1)" uses the previous capturaed content to substitute
*/
function clean(text = "") {
  return text
    .replace(/\s*<span[^>]*class="collocator"[^>]*>(.*?)<\/span>/gi, " ($1)")
    .replace(/<[^>]*>/g, "") // elimina etiquetas HTML
    .replace(/&#39;/g, "'")  // decodifica entidades comunes
    .replace(/\s*\n\s*/g, " ")
    .trim();
}


function parseTranslation(hitTranslation) {
  return hitTranslation;
}


