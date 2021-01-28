import { useSubmitPullRequest } from 'hooks/useSubmitPullRequest';
import Editor from 'components/templates/Editor';

const Index = () => {
  const { submitPullRequest } = useSubmitPullRequest();

  return <Editor submitPullRequest={submitPullRequest} />;
};

export default Index;
