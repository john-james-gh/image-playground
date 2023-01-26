import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr;

  @media screen and (min-width: 1200px) {
    max-width: var(--maxLayoutWidth);
    margin: 0 auto;
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const HeadingOne = styled.h1`
  font-size: var(--largeFontSize);
`;

export const UnorganizedList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;
