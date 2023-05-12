import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-me7iYfAzvsPvqlg53A9sxUIw',
  apiKey: process.env.OPEN_AI_API_KEY,
});
export const openAi = new OpenAIApi(configuration);
