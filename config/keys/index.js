const fs = require("fs");
const path = require("path");

const privateKeyFilePath =
  process.env.JWT_SSO_PRIVATE_KEY_FILE ||
  path.resolve(__dirname, "./jwtPrivate.key");

const privateKey_RefreshFilePath = process.env.JWT_SSO_PRIVATE_KEY_FILE || path.resolve(__dirname, './jwtRefreshPrivate.key');

const privateCert = fs.readFileSync(privateKeyFilePath);
const privateRefreshCert = fs.readFileSync(privateKey_RefreshFilePath);

const jwtValidatityKey = "simple-sso-jwt-validatity";

const privateKey = {
  "secret": "some-secret-shit-goes-here",
  "refreshTokenSecret": "some-secret-refresh-token-shit",
  "port": 3000,
  "tokenLife": 900,
  "refreshTokenLife": 86400
};

module.exports = Object.assign({}, { privateCert, jwtValidatityKey, privateKey, privateRefreshCert });
