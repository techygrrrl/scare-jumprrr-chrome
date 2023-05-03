let formElement = null;
let textareaElement = null;

const defaultWords = [
  "jump-scare",
  "jump scare",
  "jumpscare",
].join('\n')

function saveOptions(optionsText) {
  chrome.storage.sync.set({
    words: optionsText
  });
}

const init = async () => {
  formElement = document.getElementById('word-form')
  textareaElement = document.getElementById('words')

  if (!formElement) return
  if (!textareaElement) return

  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const words = textareaElement.value

    console.log('😱 Saving... ', { words })

    chrome.storage.sync.set({ words });

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        // console.log('😱 scare-jumprrr: Checking tab URL:', tab.url)
        if (tab.url.includes('https://www.twitch.tv/') || tab.url.includes('https://www.twitch.com/')) {
          console.log('😱 scare-jumprrr: Sending to:', tab.url)
          chrome.tabs.sendMessage(tab.id, { action: 'refresh-words', words });
        }
      })
    });
  })

  const data = await chrome.storage.sync.get()

  console.log('😱 scare-jumprrr: Data from Chrome storage... ', data)

  textareaElement.value = data.words?.trim() || defaultWords
}


init()
