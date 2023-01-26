// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/lib/node";

export const server = setupServer();

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
});

afterAll(() => {
  server.close();
});
