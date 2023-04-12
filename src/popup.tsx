import React, { ChangeEvent, FormEvent, ReactNode, StrictMode, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SET_API_KEY } from './constants/index';

const Popup = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [apiKey, setApiKey] = useState('');

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setApiKey(event.target.value);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    chrome.runtime.sendMessage(
      {
        type: SET_API_KEY,
        payload: {
          apiKey,
        },
      },
      res => setSuccessMessage(res),
    );
  };

  return (
    <>
      {!!successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="api-key">API Key:</label>
          <input type="text" value={apiKey} onChange={inputChangeHandler} id="api-key" />
          <button>Save</button>
        </form>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('slash-gpt') as HTMLElement);
root.render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
