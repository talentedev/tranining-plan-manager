const Session = require('../../../models/session')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Update a session in database
 * @param {Object} req - request object
 */
const updateSessionInDB = ({
  id,
  status = 'bank',
  priority = 0,
  completed = false
}) => {
  return new Promise(async (resolve, reject) => {
    Session.findByIdAndUpdate(id, {status, priority, completed}, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }

      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { updateSessionInDB }
