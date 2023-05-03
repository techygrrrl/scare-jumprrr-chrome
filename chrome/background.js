const MUTE_TIME = 15000; // 15 seconds


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  // console.log('😱 scare-jumprrr: onMessage received (background)', request)

  switch (request.action) {
    case 'mute-tab':
      return performMuteTab(request, sender);
    case 'give-words':
      return sendWords();
    default:
      //
  }
});

async function performMuteTab(request, sender) {
  if (!sender.tab) return;

  await chrome.tabs.update(sender.tab.id, { muted: true });
  console.log("😱 scare-jumprrr: Tab should have muted");

  setTimeout(async () => {
    await chrome.tabs.update(sender.tab.id, { muted: false });

    console.log("😱 scare-jumprrr: Tab should no longer be muted");
  }, MUTE_TIME);
}


const init = async () => {
  sendWords()
}


init()

async function sendWords() {
  const data = await chrome.storage.sync.get()
  // console.log('😱 scare-jumprrr: Data from Chrome storage... ', data)

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes('twitch')) {
        chrome.tabs.sendMessage(tab.id, { action: 'refresh-words', words: data.words });
      }
    })
  });
}
