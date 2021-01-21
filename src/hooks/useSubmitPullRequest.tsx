import { useCallback } from 'react';
import { PullReuqestFormData, PullReuqestInput } from 'request/pullRequest';
import { composeMarkDown } from 'utility/composeMarkdown';

const useSubmitPullRequest = () => {
  const submitPullRequest = useCallback(
    async (payload: PullReuqestFormData) => {
      const body: PullReuqestInput = {
        newBranch: payload.newBranch,
        fileName: payload.fileName,
        markDown: composeMarkDown({
          ...payload,
          publishedAt: new Date()
            .toISOString()
            .replace(/T.*/, '')
            .split('-')
            .join('-'),
        }),
      };
      await fetch('/api/github/pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    },
    []
  );

  return { submitPullRequest };
};

export { useSubmitPullRequest };
