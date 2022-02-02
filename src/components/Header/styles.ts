import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
`;

export const WeatherInfo = styled.div`
  flex: 1;

  display: flex;

  figure {
    margin-right: 12px;
  }

  strong {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.white};
    margin-right: 12px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 2px;
    line-height: 1;
  }

  span {
    display: block;
  }

  .weather-description {
    text-transform: capitalize;
  }
`;
