import { FC } from 'react';
import styled from '@emotion/styled';
import { PullReuqestFormData } from 'request/pullRequest';
import { useForm } from 'react-hook-form';
import MDXFormInput from './MDXFormInput';
import MDXFormBody from './MDXFormBody';

type Props = {
  submitPullRequest: (payload: PullReuqestFormData) => void;
};

const MDXForm: FC<Props> = ({ submitPullRequest }) => {
  const { register, handleSubmit } = useForm<PullReuqestFormData>();

  const onSubmit = handleSubmit((data) => {
    submitPullRequest(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <MDXFormInput name="title" ref={register} />
      <MDXFormInput name="summary" ref={register} />
      <MDXFormInput name="tags" ref={register} />
      <MDXFormInput name="tags" ref={register} />
      <MDXFormInput name="newBranch" ref={register} />
      <MDXFormInput name="fileName" ref={register} />
      <MDXFormBody name="body" ref={register} />
      <button type="submit">submit</button>
    </Form>
  );
};

const Form = styled('form')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default MDXForm;
