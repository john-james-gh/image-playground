import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { User } from "./";

test("should render all fields", () => {
  render(<User />);

  expect(screen.getByText("Name (Required)"));
  expect(screen.getByText("Email address (Required)"));
  expect(screen.getByText("Date (Required)"));
  expect(screen.getByText("Month (Required)"));
  expect(screen.getByText("Year (Required)"));
  expect(screen.getByText("Favorite color (Optional)"));
  expect(screen.getByText("Salary (Required)"));
});

test("should render errors", async () => {
  const user = userEvent.setup();

  render(<User />);

  await user.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(screen.getAllByText("Error: Required")).toHaveLength(4);
  });

  expect(screen.getByText("Error: Invalid format")).toBeInTheDocument();
});

test("should submit successfully", async () => {
  const user = userEvent.setup();

  render(<User />);

  await user.type(screen.getByLabelText("Name (Required)"), "John");
  await user.type(
    screen.getByLabelText("Email address (Required)"),
    "john.doe@gmail.com"
  );
  await user.selectOptions(screen.getByLabelText("Date (Required)"), "1");
  await user.selectOptions(
    screen.getByLabelText("Month (Required)"),
    "January"
  );
  await user.selectOptions(screen.getByLabelText("Year (Required)"), "2000");
  await user.type(screen.getByLabelText("Favorite color (Optional)"), "black");
  await user.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(screen.getByText("Submitted sucessfully!")).toBeInTheDocument();
  });

  expect(screen.queryByText("Error: Required")).not.toBeInTheDocument();
  expect(screen.queryByText("Error: Invalid format")).not.toBeInTheDocument();
});
