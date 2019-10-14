const config = require("config");

module.exports = function() {
  if (!config.get("JWT_PRIVATE_KEY")) {
    throw new Error("ERROR: JWT_PRIVATE_KEY is not defined.");
  }
};
