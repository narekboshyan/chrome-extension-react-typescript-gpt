import { SET_API_KEY, SET_GPT_RESPONSE } from './constants/index';
import { generateResponse } from './helpers/index';

chrome.runtime.onMessage.addListener(({ type, payload }, _, sendResponse) => {
  if (type === SET_API_KEY) {
    chrome.storage.sync.set({ apiKey: payload.apiKey }, () => {
      console.log('Api key was successfully set');
    });
    sendResponse("You're API key has successfully been loaded!");
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'slash-gpt',
    title: 'Slash GPT',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'slash-gpt') {
    return;
  }
  try {
    if (!info || !info.selectionText) return;
    const { apiKey } = await chrome.storage.sync.get('apiKey');
    console.log(apiKey, 'apiKey');
    const gptResponse = await generateResponse(info?.selectionText, apiKey);

    chrome.tabs.sendMessage(tab?.id as number, {
      type: SET_GPT_RESPONSE,
      payload: gptResponse,
    });
  } catch (error) {
    console.error('Error', error);
  }
});
