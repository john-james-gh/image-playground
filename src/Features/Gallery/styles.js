import styled from "styled-components";

const BaseImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Image = styled(BaseImage)`
  object-fit: cover;
  cursor: pointer;
`;

export const Modalmage = styled(BaseImage)`
  object-fit: contain;
`;

export const Button = styled.button`
  width: 100%;
  height: 180px;
  padding: var(--smallSpacing);
`;

export const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: var(--twoColumn);
  grid-gap: var(--smallSpacing);
  overflow-y: scroll;
  height: 62vh;

  @media screen and (min-width: 768px) {
    grid-template-columns: var(--threeColumn);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: var(--fourColumn);
  }
`;
