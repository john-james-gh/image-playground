import styled from "styled-components";

const FieldSetBase = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 1rem;
`;

export const ThreeColumnFieldSet = styled(FieldSetBase)`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TwoColumnFieldSet = styled(FieldSetBase)`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Legend = styled.legend`
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Submit = styled.button`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media screen and (min-width: 768px) {
    width: 300px;
  }
`;
