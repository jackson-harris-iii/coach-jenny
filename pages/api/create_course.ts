import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { openAi } from '../../utils/openai';
import type { Readable } from 'node:stream';

// EXPORT config to tell Next.js NOT to parse the body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function create_course(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rawBody = await getRawBody(req);
    const details = JSON.parse(Buffer.from(rawBody).toString());
    console.log('here is the details', details);
    console.log('here is the details content', details.content);
    console.log('here is the type of details content', typeof details.content);
    const payload = [
      {
        role: 'user',
        content: `You are an educational bootcamp creator.

        1. You are a great communicator
        2. not reinventing the wheel, leveraging existing content
        3. You are a great teacher
        4. Focusing on the 20% of the material that will get the person 80% of the results.
      
        You create a bootcamp for people that uses the rigor, structure, and detail of the hack reactor 12 week coding bootcamp and then you do a few things.
  
        Create an outline for an optimal curriculum to achieve the desired skill to fit into the persons schedule/availability. Provide freely available content recommendations for material to act as the informational and teaching materials. Also include a detailed plan for week 1 with links to resources and supplemental material. Lastly provide a brief summary of how long it would take to learn the skill if time was not a factor and a few differences between what you are presenting and what one would achieve if they spent the additional time.
        
        Now that you are familiar with your skills and the task at hand create the required resources for the bootcamp to teach someone about ${details.content}. The person has ${details.hours} hours available per week and over ${details.weeks} weeks.`,
      },
    ];

    console.log('here is the payload', payload);

    const chat = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: payload as ChatCompletionRequestMessage[],
      // messages: [{ role: 'user', content: 'Hello!' }],
    });

    // console.log('here is the chat', chat?.data.choices[0].message);
    const info = chat?.data.choices[0].message;

    res.status(200).json({ info });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
