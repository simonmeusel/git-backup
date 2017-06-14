const sources = ['github', 'gitlab']

module.exports = function () {
  return new Promise((resolve, reject) => {
    let pending = sources.length
    let repos = {}
    for (let source of sources) {
      require('./' + source + '.js')()
      .then((newRepos) => {
        repos = Object.assign(repos, newRepos)
        pending--
        if (pending === 0) {
          resolve({})
        }
      })
      .catch((error) => {
        console.log(error)
        pending--
        if (pending === 0) {
          resolve(repos)
        }
      })
    }
  })
}
