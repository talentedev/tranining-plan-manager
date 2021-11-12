const { getSessions } = require('./getSessions')
const { createSession } = require('./createSession')
const { updateSessions } = require('./updateSessions')
const { deleteSession } = require('./deleteSession')

module.exports = {
  getSessions,
  createSession,
  updateSessions,
  deleteSession
}
