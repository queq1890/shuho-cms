import { NextApiHandler } from 'next';
import { Octokit } from '@octokit/rest';

type Option = {
  owner: string;
  repo: string;
  baseBranch: string;
  newBranch: string;
  fileName: string;
  markDown: string;
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
  fileName,
  markDown,
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

  const newTree = await octokit.git.createTree({
    owner,
    repo,
    base_tree: currentCommit.data.tree.sha,
    tree: [
      {
        path: `contents/${fileName}.mdx`,
        mode: '100644',
        content: markDown,
      },
    ],
  });

  const newCommit = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: newTree.data.sha,
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

const getOption = ({
  newBranch,
  fileName,
  markDown,
}: {
  newBranch: string;
  fileName: string;
  markDown: string;
}) => {
  const option: Option = {
    owner: 'queq1890',
    repo: 'shuho',
    baseBranch: 'master',
    newBranch,
    fileName,
    markDown,
    pullRequest: {
      title: newBranch,
      body: 'This PR is generated with shuho-cms.',
    },
  };

  return option;
};

const pullHandler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { newBranch, fileName, markDown },
  } = req;

  switch (method) {
    case 'POST': {
      const option = getOption({
        newBranch,
        fileName,
        markDown,
      });
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
