import { useId } from "react";

import * as S from "./styles";

const Field = (props) => {
  const {
    type = "text",
    isRequired = true,
    name,
    label,
    values,
    touched,
    onChange,
    onBlur,
    errors,
    ...rest
  } = props;

  const id = useId();

  return (
    <S.Box>
      <label htmlFor={id}>
        {label} {isRequired ? "(Required)" : "(Optional)"}
      </label>

      <input
        {...rest}
        aria-required={isRequired}
        id={id}
        name={name}
        type={type}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
      />

      {touched[name] && Boolean(errors[name]) && (
        <S.Error
          aria-errormessage={id}
          aria-invalid={touched[name] && Boolean(errors[name])}
        >
          Error: {errors[name]}
        </S.Error>
      )}
    </S.Box>
  );
};

export default Field;
