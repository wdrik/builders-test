import styled from 'styled-components';

export const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.darkGray};
  border-radius: 8px;
  padding: 8px;

  span.day {
    color: ${({ theme }) => theme.colors.white};
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;

    .min {
      color: ${({ theme }) => theme.colors.white};
      margin-right: 6px;
    }
  }
`;
