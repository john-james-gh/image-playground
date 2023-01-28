import styled from "styled-components";

export const ModalContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

export const ModalBody = styled.div`
  position: relative;
  width: 85vw;
  height: 65vh;
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--smallSpacing);

  @media screen and (min-width: 768px) {
    width: 40vw;
  }
`;

export const IconCloseButton = styled.button`
  position: absolute;
  top: var(--smallSpacing);
  right: var(--smallSpacing);
  font-size: var(--mediumFontSize);
  background-color: var(--light);
  cursor: pointer;
`;
