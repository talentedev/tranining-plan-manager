const jwt = require('jsonwebtoken')
const { buildErrObject } = require('../utils')

/**
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
const getUserIdFromToken = (token = '') => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(buildErrObject(409, 'BAD_TOKEN'))
      }
      resolve(decoded.data._id)
    })
  })
}

module.exports = { getUserIdFromToken }
