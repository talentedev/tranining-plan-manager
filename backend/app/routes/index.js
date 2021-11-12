const express = require('express')
const router = express.Router()

// Load Auth route
router.use('/api/auth', require('./auth'))

// Load Company route
router.use('/api/session', require('./session'))

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router
