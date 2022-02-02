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
    align-items: center;

    .max {
      color: ${({ theme }) => theme.colors.white};
      margin-right: 6px;
      font-size: 16px;
    }

    .min {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 4px;

    div {
      flex-direction: column;

      .max {
        font-size: 12px;
      }

      .min {
        font-size: 10px;
      }
    }
  }
`;
