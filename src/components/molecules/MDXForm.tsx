import { ChangeEvent, FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { PullReuqestFormData } from 'request/pullRequest';
import { useForm } from 'react-hook-form';
import { formatText } from 'utility/formatText';
import { useSetPreviewContext } from 'contexts/previewContext';
import Snackbar from 'components/atoms/Snackbar';
import MDXFormInput from './MDXFormInput';
import MDXFormTextArea from './MDXFormTextArea';

type Props = {
  submitPullRequest: (payload: PullReuqestFormData) => void;
};

// TODO: SnackBar 関係のstate を全てcontext に移す
const SNACKBAR_TEXT = 'PR を作成しました';

const MDXForm: FC<Props> = ({ submitPullRequest }) => {
  const setPreview = useSetPreviewContext();
  const [open, setOpen] = useState(false); // TODO: SnackBar 関係のstate を全てcontext に移す

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<PullReuqestFormData>();

  useEffect(() => {
    const close = async () => {
      if (open) {
        await new Promise((resolve) => setTimeout(resolve, 4500));
        setOpen(false);
      }
    };

    close();
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    submitPullRequest(data);
    setOpen(true);
  });

  const formatBody = () => {
    const body = getValues('body');
    if (body === undefined) return;

    const formatted = formatText(body);
    setValue('body', formatted);
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPreview(event.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <MDXFormInput name="title" ref={register} />
      <MDXFormInput name="summary" ref={register} />
      <MDXFormInput name="tags" ref={register} />
      <MDXFormInput name="newBranch" ref={register} />
      <MDXFormInput name="fileName" ref={register} />
      <MDXFormTextArea
        name="body"
        ref={register}
        format={formatBody}
        onChange={onChange}
      />
      <button type="submit">submit</button>
      <Snackbar text={SNACKBAR_TEXT} open={open} type="success" />
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
