const all = require('./repos/all.js')
const git = require('./git/git.js')
const lastPulled = require('./lastPulled.js')

module.exports = function () {
  return new Promise((resolve, reject) => {
    lastPulled.init()
    .then(() => {
      all()
      .then((repos) => {
        Object.entries(repos).forEach(([sshUrl, lastPushed]) => {
          if (lastPulled.needsRepull(sshUrl, lastPushed)) {
            const date = new Date()
            console.log('Repulling ' + sshUrl)
            git(sshUrl)
            .then(() => {
              console.log('Pulled ' + sshUrl)
              lastPulled.update(sshUrl, date)
            })
            .catch((error) => {
              console.log(error)
            })
          }
        })
      })
      .catch((error) => {
        reject(error)
      })
    })
    .catch((error) => {
      reject(error)
    })
  })
}
