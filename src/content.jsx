(function logResponse() {
  chrome.runtime.sendMessage(
    {
      type: 'LOG_HELLO_WORLD',
      payload: '',
    },
    console.log
  );
})();
