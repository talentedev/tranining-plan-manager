const Session = require('../../../models/session')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Creates a session in database
 * @param {Object} req - request object
 */
const createSessionInDB = ({
  title = '',
  description = '',
  status = 'bank',
  priority = 0,
  owner = '',
}) => {
  return new Promise(async (resolve, reject) => {
    const session = new Session({
      title,
      description,
      status,
      priority,
      owner,
    });
    session.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }

      item = JSON.parse(JSON.stringify(item))

      resolve(item)
    })
  })
}

module.exports = { createSessionInDB }
