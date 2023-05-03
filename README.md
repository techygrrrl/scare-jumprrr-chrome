# 😱 Scare Jumprrr

The browser extension to help you evade jump scares on Twitch!

- [Installation](#installation)
- [Usage](#usage)
  - [Add more words](#add-more-words)


## Installation

Clone the repository and then load the `./chrome` folder as an unpacked extension ([instructions](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)).


## Usage

It runs automatically with a preset list of channel point redemptions that tend to be popular. You can view this list in the `chrome/content.js` file.

The extension's icon will be hidden by default.


### Add more words

You can add more words to the list by finding the extension in the extension menu (the puzzle piece near the address bar), clicking the action, and clicking Options. This will open the options page where you can add new words. Add one word per line.

To reset to the defaults, delete the field, save, and refresh the options page.

Words are not case sensitive, i.e. "jump scare" is the same as "Jump Scare" and "JUMP SCARE".
