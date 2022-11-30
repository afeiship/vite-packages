import React from 'react';
import VitePwaPromotion from '../../src/main';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default () => {
  return (
    <Container>
      <VitePwaPromotion lang="en-US" style={{ left: 0, right: 'auto' }} />
      <VitePwaPromotion lang="zh-CN" />
    </Container>
  );
};
