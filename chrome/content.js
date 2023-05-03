let jumpScareWords = [
  "jump-scare",
  "jump scare",
  "jumpscare",
];

const nodeParser = async (node) => {
  if (node instanceof HTMLElement) {
    if (node.getAttribute("data-test-selector") === "user-notice-line") {
      const text = node.innerText.toLowerCase();
      const word = jumpScareWords.find((word) => {
        return text.includes(word);
      });
      if (!word) return;

      console.log(`😱 scare-jumprrr: Found word "${word}" in ${text}`);
      await chrome.runtime.sendMessage({ action: "mute-tab" });
    }
  }
};

const mutationCallback = (mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(nodeParser);
    }
  });
};

const init = async () => {
  console.log("😱 scare-jumprrr: Initializing...");

  await chrome.runtime.sendMessage({ action: "give-words" });

  const elm = document.querySelector("#root");

  if (elm === null) {
    setTimeout(init, 1000);
    return;
  }

  const observer = new MutationObserver(mutationCallback);
  const config = { childList: true, subtree: true };

  observer.observe(elm, config);
};

init();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // console.log('😱 scare-jumprrr: onMessage received (content script)', message)

  switch (message.action) {
    case "refresh-words":
      return updateWords(message.words);
    default:
    //
  }
});

function updateWords(wordsText) {
  if (!wordsText) {
    console.log("😱 scare-jumprrr: No words, using defaults", jumpScareWords);
    return;
  }
  console.log("😱 scare-jumprrr: (content script) updateWords", wordsText);
  jumpScareWords = (wordsText?.split("\n") || [])
    .map((word) => word.trim())
    .filter(word => !!word);
}
