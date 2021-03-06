import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { fontSize, spacing } from 'constants/theme';

type Props = {
  name: string;
};

const MDXFormInput = forwardRef<HTMLInputElement, Props>(({ name }, ref) => {
  return (
    <LabelWrapper>
      <Label htmlFor={name}>{name}</Label>
      <input id={name} name={name} ref={ref} />
    </LabelWrapper>
  );
});

const LabelWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing.sm};
`;

const Label = styled('label')`
  font-size: ${fontSize.sm};
  margin-bottom: ${spacing.xs};
`;

export default MDXFormInput;
