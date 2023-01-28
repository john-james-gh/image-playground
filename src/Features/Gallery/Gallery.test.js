import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../setupTests";
import userEvent from "@testing-library/user-event";

import { Gallery } from "./";

const payload = {
  items: [
    {
      url: "fake.jpeg",
    },
  ],
  total: 2,
};

/** create react-app root div element so we can assert aria-hidden is true */
const root = document.createElement("div");

beforeAll(() => {
  document.body.appendChild(root);
  root.id = "root";
  root.dataset.testid = "root";
});

beforeEach(() => {
  server.use(
    rest.get("/images", (req, res, ctx) =>
      res(ctx.json(payload), ctx.status(200))
    )
  );
});

afterAll(() => {
  document.body.removeChild(root);
});

afterEach(() => {
  localStorage.clear();
});

test("should render cards", async () => {
  render(<Gallery />);

  await waitForElementToBeRemoved(screen.getByText("Loading..."));

  expect(
    screen.getByRole("button", { name: "open modal photo" })
  ).toBeInTheDocument();
});

test("should not render pagination", async () => {
  render(<Gallery />);

  await waitForElementToBeRemoved(screen.getByText("Loading..."));

  expect(
    screen.queryByRole("button", { name: "go to next page" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "go to previous page" })
  ).not.toBeInTheDocument();
});

test("should render pagination", async () => {
  const pagination = {
    items: [...Array(11).keys()].reduce(
      (previous, current) => [
        ...previous,
        {
          url: `${current}-fake.jpeg`,
        },
      ],
      []
    ),
    total: 11,
  };

  server.use(
    rest.get("/images", (req, res, ctx) =>
      res(ctx.json(pagination), ctx.status(200))
    )
  );

  render(<Gallery />);

  await waitForElementToBeRemoved(screen.getByText("Loading..."));

  expect(
    screen.getByRole("button", { name: "go to next page" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "go to previous page" })
  ).toBeInTheDocument();
  expect(screen.getByText(/Total: 2/)).toBeInTheDocument();
  expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
});

test("should open modal", async () => {
  const user = userEvent.setup();

  render(<Gallery />);

  await waitForElementToBeRemoved(screen.getByText("Loading..."));

  await user.click(screen.getByRole("button", { name: "open modal photo" }));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
