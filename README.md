# Hover-Deutsch
Hover-Deutsch is a Firefox add-on that displays the definitions and translations of German word by simply hovering over them. This information is retrieved from the PONS Dictionary API and displayed in a tooltip.

## Features
- Automatically detects the word under the cursos.
- Queries the PONS German->English dictionary.
- Displays the definitions and translations

## Project Structure
```text
.
├── manifest.json      # Extension configuration (description, scripts, permissions...)
├── background.js      # Handles API requests and formats the response
└── hoverDeutsch.js    # Detects words and displays the tooltip
``` 

## Installation
1. Clone the repository
```bash
git clone https://github.com/ShImM0/Hover-Deutsch.git && cd Hover-Deutsch
```
2. Install `web-ext`, a Node-based application  

With brew using:
```bash
brew install web-ext
```
With npm using:  
```bash
npm install --global web-ext
```  
With pacman using: 
```nash
pacman -S web-ext
```
3. Get a PONS API Key
Visit https://en.pons.com/p/online-dictionary/developers/api and generate an API key after making an account. Then, open your profile and copy the secret (first field in Show Secret). Then, replace the placeholder in `background.js`:  
`"X-Secret": "YOUR API KEY"` with the key.

5. Run the extension  
&thinsp;From the project directory, execute  
```bash
web-ext run
```
This starts Firefox and loads the extension temporarily in the browser.

## Limitations
The free PONS API is limited to 1,000 requests per month, enough for several hours of use.

## Implementation overview
> ### manifest.json
- `"manifest_version"` specifies the version that this extension specifies
- `"content_scripts"` loads the scripts into web pages whose URL matches a pattern, in this case "<all_urls>", which allows the script "hoverDeutsch.js" to be loaded in any page.
- `"background"` includes the background scripts, where the code that needs to maintain a long-term state or long-term operations are put.
- `"permissions"` includes:
    - the `"activeTab"` permission, which grants extra privileges for the active tab only
    - patterns which identifies a group of URLs for which the extension is requesting extra privileges, such as "https://api.pons.com/*".

> ### hoverDeutsch.js
- Mouse movement triggers the `process()` function:
    - detects the word using `getWord(e)`
    - sends the word to the background script using `getMeaningOfWord)`
    - waits for the returned result
    - displays the result in the tooltip using `(displayTooltipText(text, x, y)`.

> ### background.js
- A message listener waits for the lookup request, sends the request with `fetch()` using the API key and parses the response in JSON to a JavaScript object using `await res.json()`.
- The function `parseQuery()` returns the string in a YAML-like string, and uses `clean()` to remove HTML tags.
