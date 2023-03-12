chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === 'LOG_HELLO_WORLD') {
    sendResponse('Hello World');
    return true;
  }
});
