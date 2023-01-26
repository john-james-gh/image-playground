import { Field, Select } from "../../Inputs";
import * as S from "./styles";
import { dates, months, years } from "../../Configs";
import { useForm } from "./Hooks";

const User = () => {
  const initialValues = {
    name: "",
    email: "",
    dobDate: "",
    dobMonth: "",
    dobYear: "",
    color: "",
    salary: 100000,
  };

  const setValidationSchema = (data) => {
    const messages = {};

    if (!data.name) {
      messages.name = "Required";
    }

    if (!data.email) {
      messages.email = "Required";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      messages.email = "Invalid format";
    }

    if (!data.dobDate) {
      messages.dobDate = "Required";
    }

    if (!data.dobMonth) {
      messages.dobMonth = "Required";
    }

    if (!data.dobYear) {
      messages.dobYear = "Required";
    }

    return messages;
  };

  const {
    values,
    onChange,
    onBlur,
    onSubmit,
    errors,
    touched,
    isSuccess,
    isSubmitting,
  } = useForm({
    initialValues,
    setValidationSchema,
  });

  return (
    <>
      <h2>User</h2>

      <S.Form aria-labelledby="basic" onSubmit={onSubmit}>
        <S.Legend id="legend">
          <h3>Basic info</h3>
        </S.Legend>

        <S.TwoColumnFieldSet aria-labelledby="basic">
          <Field
            name="name"
            label="Name"
            type="text"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
          />

          <Field
            name="email"
            type="email"
            label="Email address"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
          />
        </S.TwoColumnFieldSet>

        <S.Legend id="dob">
          <h3>DOB</h3>
        </S.Legend>

        <S.ThreeColumnFieldSet aria-labelledby="dob">
          <Select
            name="dobDate"
            label="Date"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
            options={dates}
          />

          <Select
            name="dobMonth"
            label="Month"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
            options={months}
          />

          <Select
            name="dobYear"
            label="Year"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
            options={years}
          />
        </S.ThreeColumnFieldSet>

        <S.Legend id="misc">
          <h3>Misc</h3>
        </S.Legend>

        <S.TwoColumnFieldSet>
          <Field
            name="color"
            type="text"
            label="Favorite color"
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
            isRequired={false}
          />
        </S.TwoColumnFieldSet>

        <S.TwoColumnFieldSet aria-labelledby="misc">
          <Field
            name="salary"
            type="range"
            label="Salary"
            min={0}
            max={200000}
            values={values}
            errors={errors}
            touched={touched}
            onChange={onChange}
            onBlur={onBlur}
          />

          <p>{values["salary"]}</p>
        </S.TwoColumnFieldSet>

        {isSuccess ? (
          <h3 role="status">Submitted sucessfully!</h3>
        ) : (
          <S.Submit disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </S.Submit>
        )}
      </S.Form>
    </>
  );
};

export default User;
