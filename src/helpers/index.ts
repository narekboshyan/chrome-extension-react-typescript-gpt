export const generateResponse = async (prompt: string, apiKey: string) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${apiKey}`);

  let raw = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow' as RequestRedirect,
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
