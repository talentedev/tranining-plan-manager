/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      email: req.email,
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
