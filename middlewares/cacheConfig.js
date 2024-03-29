const cacheConfig = (req, res, next) => {
  // Removes cache of the previous page
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );

  next();
};

module.exports = cacheConfig;
