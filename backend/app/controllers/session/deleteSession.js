const { matchedData } = require('express-validator')
const { getUserIdFromToken } = require('../../middleware/auth')
const { handleError, jwtExtractor } = require('../../middleware/utils')
const { deleteSessionInDB } = require('./helpers')
const { sessionExists } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')
const Session = require('../../models/session')

/**
 * Delete sessions
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteSession = async (req, res) => {
  try {
    req = matchedData(req)
    await deleteSessionInDB({id: req.id})
    res.status(201).json(req)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteSession }
