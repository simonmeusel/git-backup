const axios = require('axios')
const gitea = require('../../.env.json').gitea

module.exports = function () {
  return new Promise((resolve, reject) => {
    // Get repositories of authenticated user
    axios.get(gitea.base + '/user/repos', {
      params: {
        'access_token': gitea.auth.access_token
      }
    })
      .then((response) => {
          let repos = {}
          for (let repo of response.data) {
            repos[repo.ssh_url] = new Date(repo.updated_at).valueOf()
          }
          resolve(repos)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
