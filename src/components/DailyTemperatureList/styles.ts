import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 16px 0;
  display: flex;

  > div {
    :not(:last-child) {
      margin-right: 12px;
    }
  }

  @media (max-width: 768px) {
    > div {
      :not(:last-child) {
        margin-right: 6px;
      }
    }
  }
`;
