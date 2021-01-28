import { FC } from 'react';
import styled from '@emotion/styled';
import MDXForm from 'components/molecules/MDXForm';
import MDXPreview from 'components/molecules/MDXPreview';
import { PullReuqestFormData } from 'request/pullRequest';

type Props = {
  submitPullRequest: (payload: PullReuqestFormData) => void;
};

const Editor: FC<Props> = ({ submitPullRequest }) => {
  return (
    <Root>
      <MDXForm submitPullRequest={submitPullRequest} />
      <MDXPreview />
    </Root>
  );
};

const Root = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
`;

export default Editor;
