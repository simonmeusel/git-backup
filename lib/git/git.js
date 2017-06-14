const folder = require('../../.env.json').folder
const fs = require('fs-extra')
const path = require('path')
const spawn = require('child_process').spawn

const shell = '/bin/sh'
const scriptPath = path.join(__dirname, 'pull.sh')

function getName (sshUrl) {
  return sshUrl.replace(/\//g, '-')
}

function getPath (sshUrl) {
  return path.join(folder, getName(sshUrl))
}

function pull (sshUrl) {
  return new Promise((resolve, reject) => {
    const process = spawn(shell, [
      scriptPath
    ], {cwd: getPath(sshUrl)})
    process.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(code)
      }
    })
  })
}

function clone (sshUrl) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(getPath(sshUrl))) {
      const process = spawn(shell, [
        '-c', `git clone ${sshUrl} ${getName(sshUrl)}`
      ], {cwd: folder})
      process.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(code)
        }
      })
    } else {
      resolve()
    }
  })
}

module.exports = function (sshUrl) {
  return new Promise((resolve, reject) => {
    clone(sshUrl)
    .then(() => {
      pull(sshUrl)
      .then(() => {
        resolve()
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
