const { matchedData } = require('express-validator')
const { getUserIdFromToken } = require('../../middleware/auth')
const { handleError, jwtExtractor } = require('../../middleware/utils')
const { updateSessionInDB } = require('./helpers')
const { sessionExists } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')
const Session = require('../../models/session')

/**
 * Update sessions
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateSessions = async (req, res) => {
  try {
    req = matchedData(req)
    for (var i = 0; i < req.sessions.length; i++) {
      let session = req.sessions[i];
      await updateSessionInDB({id: session._id, status: session.status, priority: session.priority, completed: session.completed})
    }
    res.status(201).json(req.sessions)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateSessions }
