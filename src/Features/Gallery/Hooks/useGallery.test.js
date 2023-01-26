import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { server } from "../../../setupTests";
import { useGallery } from ".";

test("should resolve", async () => {
  server.use(
    rest.get("/fake", (req, res, ctx) =>
      res(ctx.json({ name: "success" }), ctx.status(200))
    )
  );

  const { result } = renderHook(() => useGallery({ path: "/fake" }));

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.data).toStrictEqual({ name: "success" });
  expect(result.current.error).toBe("");
});

test("should reject", async () => {
  server.use(
    rest.get("/fake", (req, res, ctx) =>
      res(ctx.json({ error: "fail" }), ctx.status(400))
    )
  );

  const { result } = renderHook(() => useGallery({ path: "/fake" }));

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });

  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe("something went wrong");
});
