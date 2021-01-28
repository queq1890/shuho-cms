import { FC } from 'react';
import styled from '@emotion/styled';

type Props = {
  direction: 'column' | 'row';
};

const Flex: FC<Props> = ({ children, ...rest }) => {
  return <Root {...rest}>{children}</Root>;
};

const Root = styled('div')((props: Props) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: props.direction,
}));

export default Flex;
