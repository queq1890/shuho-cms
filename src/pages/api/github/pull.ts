import { NextApiHandler } from 'next';
import { Octokit } from '@octokit/rest';

type Option = {
  owner: string;
  repo: string;
  baseBranch: string;
  newBranch: string;
  pullRequest: {
    title: string;
    body: string;
  };
  commitMessage?: string;
};

const octokit = new Octokit({
  auth: process.env.SHUHO_TOKEN,
});

const main = async ({
  owner,
  repo,
  baseBranch,
  newBranch,
  pullRequest: { body, title },
  commitMessage = 'WIP',
}: Option) => {
  const baseBranchRef = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });

  const newBranchRef = await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: baseBranchRef.data.object.sha,
  });

  const currentCommit = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: newBranchRef.data.object.sha,
  });

  const newCommit = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: currentCommit.data.tree.sha,
    parents: [currentCommit.data.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${newBranch}`,
    sha: newCommit.data.sha,
  });

  await octokit.pulls.create({
    owner,
    repo,
    head: newBranch,
    base: baseBranch,
    title,
    body,
  });
};

const getOption = ({ newBranch }: { newBranch: string }) => {
  const option: Option = {
    owner: 'queq1890',
    repo: 'octokit-playground',
    // repo: 'shuho',
    baseBranch: 'master',
    newBranch,
    pullRequest: {
      title: newBranch,
      body: 'This PR is generated with shuho-cms.',
    },
  };

  return option;
};

const pullHandler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const option = getOption({ newBranch: 'foo' });
      await main(option);

      res.status(200).json({ ok: true });
      break;
    }

    // Get data from your database

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default pullHandler;
