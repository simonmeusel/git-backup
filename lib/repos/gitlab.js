const axios = require('axios')
const gitlab = require('../../.env.json').gitlab

module.exports = function () {
  return new Promise((resolve, reject) => {
    // Get repositories of authenticated user
    axios.get(gitlab.base + '/projects', {
      params: {
        'order_by': 'last_activity_at',
        'per_page': 100,
        'membership': true,
        'private_token': gitlab.auth.private_token
      }
    })
    .then((response) => {
      let repos = {}
      for (let repo of response.data) {
        repos[repo.ssh_url_to_repo] = repo.last_activity_at
      }
      resolve(repos)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
