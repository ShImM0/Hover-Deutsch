function parseQuery(response) {
  let result = [];
  for (const languageDir of response) {
    console.log(`language: ${languageDir.lang}\n`);

    let translations = [];
    let entries = [];
    for (const hit of languageDir.hits) {
      switch (hit.type) {
        case "entry":
          printEntry(hit);
          //entries.push(parseEntry(hit));
          break;

        case "translation":
          translations.push(parseTranslation(hit));
          break;
      }
    }
    result.push({
      lang: languageDir.lang,
      entries,
      translations
    });
  }
  return result;
}

// Print in format
function printEntry(hitEntry) {
  let out = "";

  for (const rom of hitEntry.roms) {
    out += `  - headword: ${rom.headword}\n`;
    out += `    wordclass: ${rom.wordclass}\n`;
    out += `    senses:\n`;

    for (const arab of rom.arabs) {
      out += `       ${clean(arab.header)}\n`;

      for (const tr of arab.translations) {
        out += `          - ${clean(tr.source)}\n`;
        //out += `          - ${clean(tr.source)} -> ${clean(tr.target)}\n`;
      }
    }

    out += "\n";
  }

  console.log(out);
}


/* Replaces span of class "collocator" to be wrapped in parenthesis
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


module.exports = {
  parseQuery,
  //parseEntry,
  printEntry,
  parseTranslation
};

