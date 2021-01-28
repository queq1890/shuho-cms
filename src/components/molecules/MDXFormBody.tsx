import { ChangeEvent, forwardRef } from 'react';
import styled from '@emotion/styled';
import { fontSize, spacing } from 'constants/theme';

type Props = {
  name: string;
  format: () => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const MDXFormBody = forwardRef<HTMLTextAreaElement, Props>(
  ({ name, format, onChange }, ref) => {
    return (
      <LabelWrapper>
        <Label htmlFor={name}>{name}</Label>
        <TextArea
          id={name}
          ref={ref}
          name={name}
          onBlur={format}
          onChange={onChange}
        />
      </LabelWrapper>
    );
  }
);

const LabelWrapper = styled('div')`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: ${spacing.sm};
`;

const Label = styled('label')`
  font-size: ${fontSize.xs};
  margin-bottom: ${spacing.xs};
`;

const TextArea = styled('textarea')`
  height: 100%;

  div {
    height: 100%;
  }
`;

export default MDXFormBody;
