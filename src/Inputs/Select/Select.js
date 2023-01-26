import { useId } from "react";

import * as S from "./styles";

const Select = (props) => {
  const {
    isRequired = true,
    options = [],
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

      <select
        {...rest}
        id={id}
        name={name}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value=""></option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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

export default Select;
