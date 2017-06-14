const axios = require('axios')
const github = require('../../.env.json').github

module.exports = function () {
  return new Promise((resolve, reject) => {
    // Get repositories of authenticated user
    axios.get(github.base + '/user/repos', {
      params: {
        'sort': 'pushed',
        'per_page': 100
      },
      auth: github.auth
    })
    .then((response) => {
      let repos = {}
      for (let repo of response.data) {
        repos[repo.ssh_url] = repo.pushed_at
      }
      resolve(repos)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
