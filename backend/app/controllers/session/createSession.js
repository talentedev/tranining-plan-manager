const { matchedData } = require('express-validator')
const { getUserIdFromToken } = require('../../middleware/auth')
const { handleError, jwtExtractor } = require('../../middleware/utils')
const { createSessionInDB } = require('./helpers')
const { sessionExists } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')
const Session = require('../../models/session')

/**
 * Create a session
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createSession = async (req, res) => {
  try {
    const token = jwtExtractor(req)
    let userId = await getUserIdFromToken(token)
    req = matchedData(req)
    const doesSessionExists = await sessionExists(req.title)
    if (!doesSessionExists) {
      let status = 'bank';
      let sessions = await Session.find({owner: userId});
      let priority = sessions.length;
      const item = await createSessionInDB({ title: req.title, description: req.description, status: status, priority: priority, owner: userId})
      res.status(201).json(item)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createSession }
