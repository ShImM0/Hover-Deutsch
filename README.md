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
```text
git clone https://github.com/ShImM0/Hover-Deutsch.git && cd Hover-Deutsch
```
2. Install `web-ext`, a Node-based application  

With brew using:
```text
brew install web-ext
```
With npm using:  
```text
npm install --global web-ext
```  
With pacman using: 
```text
pacman -S web-ext
```
3. Get a PONS API Key
Visit https://en.pons.com/p/online-dictionary/developers/api and generate an API key after making an account. Then, open your profile and copy the secret (first field in Show Secret). Then, replace the placeholder in `background.js`:  
`"X-Secret": "YOUR API KEY"` with the key.

5. Run the extension  
From the project directory, execute  
`web-ext run`  
This starts Firefox and loads the extension temporarily in the browserr.

## Limitations
The free PONS API is limited to 1,000 requests per month, enough for several hours of use.
