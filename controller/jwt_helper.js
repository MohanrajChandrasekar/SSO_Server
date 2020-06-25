const jwt = require("jsonwebtoken");
const { promiseImpl } = require("ejs");
const { privateCert } = require("../config").keys;
const { privateKey, privateRefreshCert } = require('../config').keys;

const ISSUER = "simple-sso";

const genJwtToken = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      privateCert,
      {
        algorithm: "RS256",
        expiresIn: privateKey.tokenLife,
        issuer: ISSUER
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });

const genRefreshToekn = payload =>
  new promiseImpl((resolve, reject) => {
    jwt.sign(payload,
      privateRefreshCert,
      {
        // algorithm: "RS256",
        expiresIn: privateKey.refreshTokenLife,
        issuer: ISSUER
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      })
  });

module.exports = Object.assign({}, { genJwtToken, genRefreshToekn });
