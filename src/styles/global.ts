import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: ${(props) => props.theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};

    font: 400 15px Roboto, sans-serif;
		width: 100%;
		height: 100vh;

  }
`;
