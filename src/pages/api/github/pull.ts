import { NextApiHandler } from 'next';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.SHUHO_TOKEN,
});

const pullHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { data } = await octokit.pulls.get({
        owner: 'queq1890',
        repo: 'shuho',
        pull_number: 5,
        mediaType: {
          format: 'diff',
        },
      });

      res.status(200).json({ data });
      break;
    }

    // Get data from your database

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default pullHandler;
