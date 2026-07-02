# Hover-Deutsch

**Hover-Deutsch** is a Firefox add-on that displays the definitions and translations of German word simply by hovering over them. This information is retrieved from the PONS Dictionary API and displayed in a tooltip.

## Table of Contents
 
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Settings](#settings)
- [Limitations](#limitations)
- [Implementation Overview](#implementation-overview)
- [More Information](#more-information)


## Features

- **Word Detection:** Automatically detects the word under the cursor.
- **API Query:** Queries the PONS German->English dictionary.
- **Visual Interface:** Displays the definitions and translations.
- **Customization:** Tooltip colors, detection mode, translationn display, and hide delay are configurable from the options page.

## Project Structure

```text
.
├── manifest.json      # Extension configuration (description, scripts, permissions...)
├── background.js      # Handles API requests and formats the response
├── options.js         # Adds and manages the event listeners for the options 
├── options.html       # Settings interface
├── options.css        # Stylesheet for the settings
├── popup.js           # Its event listener opens the option page
├── popup.html         # Popup interface that opens the option page
└── hoverDeutsch.js    # Detects words and displays the 
tooltip
``` 

## Installation
1. **Clone the repository**
    ```bash
    git clone https://github.com/ShImM0/Hover-Deutsch.git && cd Hover-Deutsch
    ```

2. **Install `web-ext`, a Node-based application**  

    With brew using:
    ```bash
    brew install web-ext
    ```
    With npm using:  
    ```bash
    npm install --global web-ext
    ```  
    With pacman using: 
    ```bash
    pacman -S web-ext
    ```

3. **Get a PONS API Key**

    - Visit [PONS Dictionary API](https://en.pons.com/p/online-dictionary/developers/api) and generate an API key after making an account. Then, open your profile and copy the secret (the first field in "Show Secret").
    - Replace the placeholder in `background.js`:  
    `"X-Secret": "YOUR API KEY"` with the key.

5. **Run the extension**  

    From the project directory, execute  
    ```bash
    web-ext run
    ```
    This starts Firefox and loads the extension temporarily in the browser.


## Settings
 
The options page (opened from the toolbar popup, or via `about:addons`) lets you configure:
 
| Setting             | Description                                                           | Default   |
|----------------------|------------------------------------------------------------------------|-----------|
| Detection mode        | Look up the word on **hover** or on **click**                          | Hover     |
| Show translations     | Append the English translation next to each German sense               | Off       |
| Tooltip background    | Background color of the tooltip                                        | `#000000` |
| Tooltip font color    | Text color of the tooltip                                              | `#ffffff` |
| Delay                 | Milliseconds before the tooltip hides after the cursor leaves a word   | `500`     |
 
All settings persist in `browser.storage.local` and are applied live, without needing to reload the page.



## Limitations

The free PONS API is limited to 1,000 requests per month, enough for several hours of use.

## Implementation overview


### `manifest.json`
- `"manifest_version"` specifies the version that this extension uses.
- `"content_scripts"` loads `hoverDeutsch.js` into web pages whose URL matches a pattern, in this case "<all_urls>", which allows the script "hoverDeutsch.js" to be loaded in any page.
- `"background"` includes the background scripts, where the code that needs to maintain a long-term state or long-term operations are put.
- `"options_ui"` registers `options.html` as the settings page, opened in a new tab.
- `"permissions"` includes:
    - `"activeTab"`, granting extra privileges for the active tab only.
    - `"storage"`, used to persist user settings.
    - patterns, which identifies a group of URLs for which the extension is requesting extra privileges, such as "https://api.pons.com/*".


### `hoverDeutsch.js`
- Loads stored settings on startup and reacts live to changes via `browser.storage.onChanged`.
- `setDetectionMode(mode)` switches between listening on `mousemove` (hover) or `click`.
- Each event triggers the `process(e)` function:
    - detects the word using `getWord(e)`.
    - sends the word to the background script via `getMeaningOfWord(word)`.
    - waits for the parsed result.
    - displays the result in the tooltip using `displayTooltipText(text, x, y)`.

### `background.js`
- A message listener (`browser.runtime.onMessage`) waits for the lookup request.
- Sends the request with `fetch()` using the API key and parses the response in JSON to a JavaScript object using `await res.json()`.
- `parseQuery()` converts the response into a YAML-like string (showing translations if requested), using `clean()` to remove HTML tags. 

### `options.js`
- Reads and writes each setting (colors, translations toggle, delay, detection mode) to `browser.storage.local` whenever its corresponding control changes.

## More information
For more information about extension development, read [Firefox's Extension Basics](https://extensionworkshop.com/extension-basics/) and [Firefox Extension Workshop](https://extensionworkshop.com/).
