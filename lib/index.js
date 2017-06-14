const all = require('./repos/all.js')
const git = require('./git/git.js')
const lastPulled = require('./lastPulled.js')

function saveConfig () {
  console.log('Created backup!')
  console.log('Saving config...')
  lastPulled.saveData()
  .then(() => {
    console.log('Saved config!')
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = function () {
  return new Promise((resolve, reject) => {
    lastPulled.init()
    .then(() => {
      all()
      .then((repos) => {
        let pending = Object.entries(repos).length
        if (pending === 0) {
          saveConfig()
        }
        Object.entries(repos).forEach(([sshUrl, lastPushed]) => {
          if (lastPulled.needsRepull(sshUrl, lastPushed)) {
            const date = new Date()
            console.log('Repulling ' + sshUrl)
            git(sshUrl)
            .then(() => {
              pending--
              console.log('Pulled ' + sshUrl)
              lastPulled.update(sshUrl, date)
              if (pending === 0) {
                saveConfig()
              }
            })
            .catch((error) => {
              pending--
              console.log(error)
              if (pending === 0) {
                saveConfig()
              }
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
