import React from 'react';
import { useForm } from 'react-hook-form';
import { useSubmitPullRequest } from 'hooks/useSubmitPullRequest';
import { PullReuqestFormData } from 'request/pullRequest';

const Index = () => {
  const { submitPullRequest } = useSubmitPullRequest();
  const { register, handleSubmit } = useForm<PullReuqestFormData>();

  const onSubmit = handleSubmit((data) => {
    submitPullRequest(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">
        Title
        <input id="title" name="title" ref={register} />
      </label>

      <label htmlFor="summary">
        Summary
        <input id="summary" name="summary" ref={register} />
      </label>

      <label htmlFor="tags">
        Tags
        <input id="tags" name="tags" ref={register} />
      </label>

      <label htmlFor="newBranch">
        Branch name
        <input id="newBranch" name="newBranch" ref={register} />
      </label>

      <label htmlFor="fileName">
        File name
        <input id="fileName" name="fileName" ref={register} />
      </label>

      <label htmlFor="body">
        Body
        <textarea id="body" name="body" ref={register} />
      </label>

      <button type="submit">submit</button>
    </form>
  );
};

export default Index;
