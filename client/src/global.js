import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
   
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
 
    transition: background 0.25s linear, color 0.25s linear;
  }`