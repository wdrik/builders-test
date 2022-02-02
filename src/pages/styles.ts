import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.section`
  width: 100%;
  height: 100%;
  max-width: 1024px;
  padding: 16px;
`;

export const Tab = styled.div`
  width: 100%;
`;

export const TabHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const TabItem = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  padding: 2px;
  margin: 4px;
  border-bottom: 2px solid transparent;

  cursor: pointer;
  transition: all ease-in-out 0.4s;

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const TabContent = styled.div`
  width: 100%;
`;
