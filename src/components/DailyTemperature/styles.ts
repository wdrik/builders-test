import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  padding: 8px;

  transition: background-color ease-in-out 0.4s;
  cursor: pointer;

  &.active {
    background-color: ${({ theme }) => theme.colors.darkGray};
    filter: brightness(1);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGray};
    filter: brightness(0.8);
  }

  span.day {
    color: ${({ theme }) => theme.colors.white};
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;

    .max {
      color: ${({ theme }) => theme.colors.white};
      margin-right: 6px;
    }
  }
`;
