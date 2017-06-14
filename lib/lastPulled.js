const folder = require('../.env.json').folder
const fs = require('fs-extra')
const path = require('path')

const dataPath = path.join(folder, 'lastPulled.json')

let data = {}

module.exports = {
  init: function () {
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(dataPath)) {
          fs.outputJsonSync(dataPath, {})
        }
      } catch (error) {
        reject(error)
      }
      this.loadData()
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  getData: function () {
    return new Promise((resolve, reject) => {
      try {
        resolve(fs.readJsonSync(dataPath))
      } catch (error) {
        reject(error)
      }
    })
  },
  setData: function (data) {
    return new Promise((resolve, reject) => {
      fs.outputJsonSync(dataPath, data)
      resolve()
    })
  },
  loadData: function () {
    return new Promise((resolve, reject) => {
      this.getData()
      .then((newData) => {
        data = newData
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  saveData: function () {
    return new Promise((resolve, reject) => {
      this.setData(data)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  update: function (sshUrl, lastPulled) {
    data[sshUrl] = lastPulled.getTime()
  },
  needsRepull: function (sshUrl, lastPushed) {
    lastPushed = new Date(lastPushed)
    let lastPulled = data[sshUrl]
    if (typeof lastPulled === 'undefined') {
      return true
    }
    lastPulled = new Date(lastPulled)
    return lastPushed > lastPulled
  }
}
