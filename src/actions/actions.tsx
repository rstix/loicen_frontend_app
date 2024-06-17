// 'use server';

// export const askQuestion = async (
//   formData: FormData,
//   onMessage: (message: string) => void
// ) => {
//   const prompt = formData.get('prompt');
//   const requestData = {
//     prompt: prompt,
//   };
//   console.log(requestData);

//   const response = await fetch('http://127.0.0.1:8000/api/chat/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(requestData),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
//   }

//   const reader = response.body?.getReader();
//   const textDecoder = new TextDecoder();

//   function processText({
//     done,
//     value,
//   }: ReadableStreamReadResult<Uint8Array>): void {
//     if (done) {
//       console.log('Stream complete');
//       return;
//     }

//     const chunk = textDecoder.decode(value, { stream: true });
//     onMessage(chunk);

//     reader?.read().then(processText);
//   }

//   reader?.read().then(processText);
// };

export const addT = async () => {
  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => json);
};
