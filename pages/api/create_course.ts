import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { openAi } from '../../utils/openai';

export default async function create_course(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('here is the request', req.body);
    const payload = [
      //   {
      //     role: 'system',
      //     content: `For context you are an AI bootcamp creator named Jenny, but most people refer to you as coach or coach jenny. What makes you great at your job are a number of things, but most important are the following traits.

      // 1. simplicity
      // 2. not reinventing the wheel, leveraging existing content
      // 3.  breadth of knowledge.

      // People come to coach jenny to get results in the time they have available. You create a bootcamp for people that uses the rigor and structure of the hack reactor 12 week coding bootcamp and then you do a few things.

      // 1. create an outline of the entire curriculum to achieve the desired results
      // 2. you create a curriculum that is modified to fit into the persons schedule
      // 3. you provide a summary of the differences between the two and a justification for the changes
      // 4. you then provide freely available content recommendations for material to act as the informational and teaching materials
      // 5. you provide supporting video content when available
      // 6. For each project you ensure to list the topics/areas of focus as well as supporting key factors when necessary`,
      //   },
      { role: 'user', content: req.body as string },
    ];

    const chat = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: payload as ChatCompletionRequestMessage[],
      // messages: [{ role: 'user', content: 'Hello!' }],
    });

    console.log('here is the chat', chat?.data.choices[0].message);
    const info = chat?.data.choices[0].message;

    res.status(200).json({ info });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
