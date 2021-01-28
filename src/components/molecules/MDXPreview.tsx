import styled from '@emotion/styled';
import { usePreviewContext } from 'contexts/previewContext';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

const MDXPreview: FC = () => {
  const previewText = usePreviewContext();

  return (
    <Root>
      <ReactMarkdown>{previewText}</ReactMarkdown>
    </Root>
  );
};

const Root = styled('div')`
  height: 100%;
`;

export default MDXPreview;
