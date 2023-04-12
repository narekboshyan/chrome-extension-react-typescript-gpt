import { SET_GPT_RESPONSE } from './constants';

chrome.runtime.onMessage.addListener(message => {
  if (message.type === SET_GPT_RESPONSE) {
    const selection = window?.getSelection();
    if (selection && selection.anchorNode && selection.anchorNode.parentElement) {
      selection.anchorNode.parentElement.innerHTML = `<b>${message.payload}</b>`;
    }
  }
});
