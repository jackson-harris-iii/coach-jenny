import { Magic } from '@magic-sdk/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create an instance of magic admin using our secret key (not our publishable key)
let mAdmin = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Grab the DID token from our headers and parse it
    const didToken = mAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization || ''
    );
    // Validate the token and send back a successful response
    await mAdmin.token.validate(didToken);
    res.status(200).json({ authenticated: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
