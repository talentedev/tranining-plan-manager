const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  validateCreateSession,
  validateUpdateSession,
  validateDeleteSession
} = require('../controllers/session/validators')

const {
  getSessions,
  createSession,
  updateSessions,
  deleteSession
} = require('../controllers/session')

/*
 * Get sessions
 */
router.get('/', requireAuth, trimRequest.all, getSessions)

/*
 * Create a session
 */
router.post('/create', requireAuth, trimRequest.all, validateCreateSession, createSession)

/*
 * update sessions
 */
router.post('/update', requireAuth, trimRequest.all, validateUpdateSession, updateSessions)

/*
 * delete sessions
 */
router.get('/delete', requireAuth, trimRequest.all, validateDeleteSession, deleteSession)

module.exports = router
