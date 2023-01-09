const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});
const openai = new OpenAIApi(configuration);

async function generateImg(prompt) {
  const imageSize = '512x512';


  const response = await openai.createImage({
    prompt,
    n: 1,
    size: imageSize,
});

  const imageUrl = response.data.data[0].url;
  return imageUrl
};

async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});
  const answer = response.data.choices[0].text;
  return answer;
}

module.exports = { ask, generateImg };
