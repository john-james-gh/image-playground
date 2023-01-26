import { renderHook } from "@testing-library/react";

import { useForm } from "./";

const initialValues = {
  fullName: "",
};

test("should initiate", () => {
  const { result } = renderHook(() => useForm({ initialValues }));

  expect(result.current.values).toStrictEqual(initialValues);
  expect(result.current.errors).toStrictEqual({});
  expect(result.current.touched).toStrictEqual({});
  expect(result.current.isSubmitting).toBe(false);
  expect(result.current.isSuccess).toBe(false);
});
