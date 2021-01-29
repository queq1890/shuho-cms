import { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';
import { spacing } from 'constants/theme';

type SnackbarType = 'success' | 'error';

type WrapperStyleProps = {
  type: SnackbarType;
};

type Props = {
  text: string;
  open: boolean;
  type: SnackbarType;
};

const SNACKBAR_COLORS: Record<SnackbarType, string> = {
  success: 'lightgreen',
  error: 'orange',
};

const Snackbar: FC<Props> = ({ open, text, type }) => {
  const [rerenderKey, setRerenderKey] = useState('');

  useEffect(() => {
    if (open) {
      setRerenderKey(`${+new Date()}`);
    } else {
      setRerenderKey('');
    }
  }, [open]);

  if (rerenderKey === '') return null;

  return (
    <Root key={rerenderKey}>
      <Wrapper type={type}>{text}</Wrapper>
    </Root>
  );
};

const slide = keyframes`
  from {
    bottom: -100;
  }

  20%, 80% {
    bottom: 0;
  }

  to {  
    bottom: -100
  }
`;

const Root = styled('div')({
  position: 'absolute',
  zIndex: 100,
  bottom: -100,
  left: 0,
  animation: `${slide} 4s ease`,
});

const Wrapper = styled('div')<WrapperStyleProps>(({ type }) => ({
  borderRadius: 6,
  background: SNACKBAR_COLORS[type],
  fontWeight: 'bold',
  color: 'white',
  padding: spacing.sm,
  marginBottom: spacing.lg,
  marginLeft: spacing.lg,
}));

export default Snackbar;
