import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { fontSize, spacing } from 'constants/theme';

type Props = {
  name: string;
};

const MDXFormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <LabelWrapper>
      <Label htmlFor={props.name}>{props.name}</Label>
      <input id={props.name} ref={ref} />
    </LabelWrapper>
  );
});

const LabelWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.sm};
`;

const Label = styled('label')`
  font-size: ${fontSize.xs};
  margin-bottom: ${spacing.xs};
`;

export default MDXFormInput;
