import { useState } from "react";
import debounce from "lodash/debounce";

const useForm = (props) => {
  const { initialValues, setValidationSchema } = props;

  const [values, setValues] = useState(initialValues);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    /** Could also use React Fiber's (v18) `useDeferredValue` hook instead of `debounce` */
    /** `setErrors` runs on every keystroke so we throttle it down a tad for performance sake */
    const debounced = debounce(
      () =>
        setErrors(
          onValidate({
            ...values,
            [event.target.name]: event.target.value,
          })
        ),
      300
    );

    debounced();
  };

  const onBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });

    setErrors(
      onValidate({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  };

  const onValidate = (data) => {
    return setValidationSchema(data);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const allErrors = onValidate(values);

    if (Object.values(allErrors).length > 0) {
      /** If submission is attempted, check if there are any `errors`. Set all errors, provided there are errors */
      setErrors(allErrors);
      /** If submission is attempted, set all fields to touched so that `errors` can render */
      const allTouched = Object.keys(initialValues).reduce(
        (previous, current) => ({
          ...previous,
          [current]: true,
        }),
        {}
      );

      setTouched(allTouched);
      setIsSubmitting(false);
      return;
    }

    (async () => {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("success");
          setIsSuccess(true);
          setIsSubmitting(false);
        }, 300);
      });
    })();
  };

  return {
    onSubmit,
    isSuccess,
    errors,
    onChange,
    onBlur,
    touched,
    values,
    setValidationSchema,
    isSubmitting,
  };
};

export default useForm;
