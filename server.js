const app = require("express")();
const images = require("./src/images.json");
const morgan = require("morgan");
const apicache = require("apicache");

app.use(morgan("dev"));

let cache = apicache.middleware;

/** caching all routes for 5 minutes */
app.use(cache("5 minutes"));

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const logResponseTime = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log("%s : %fms", req.path, elapsedTimeInMs);
  });

  next();
};

app.use(logResponseTime);

app.get("/images", ({ query }, res) => {
  /** subtract `query.page` by 1 because `slice` starts at 0 index */
  const firstPageIndex = (query.page - 1) * 10;
  /** hardcoded `10` as limit per response but that can also be turned into a query param */
  const lastPageIndex = firstPageIndex + 10;

  const items = query.page
    ? images.slice(firstPageIndex, lastPageIndex)
    : images;

  // since response is not providing `next` and `previous` links, client needs `total` as an alternative
  const data = { items, total: images.length };

  setTimeout(() => {
    return res.status(200).json(data);
  }, randomInterval(500, 1500));
});

app.listen(5000, () => {
  process.stdout.write("Server is available on http://localhost:5000/\n");
});
