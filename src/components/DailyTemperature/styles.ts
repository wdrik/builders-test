import styled from 'styled-components';

export const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  padding: 8px;

  transition: background-color ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};
    filter: brightness(0.8);
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.darkGray};
    filter: brightness(1);
  }

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
