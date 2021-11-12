const Session = require('../../models/session')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get sessions
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getSessions = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    query.owner = req.query.owner
    res.status(200).json(await getItems(req, Session, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getSessions }
