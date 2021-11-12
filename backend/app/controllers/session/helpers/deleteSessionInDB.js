const Session = require('../../../models/session')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Delete a session in database
 * @param {Object} id - request object
 */
const deleteSessionInDB = ({
  id,
}) => {
  return new Promise(async (resolve, reject) => {
    Session.findByIdAndDelete(id, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }

      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { deleteSessionInDB }
