const Session = require('../../models/session')
const { buildErrObject } = require('./buildErrObject')

/**
 * Checks Session model if Session with an specific title exists
 * @param {string} title - title
 */
const sessionExists = (title = '') => {
  return new Promise((resolve, reject) => {
    Session.findOne(
      {
        title
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'SESSION_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { sessionExists }
