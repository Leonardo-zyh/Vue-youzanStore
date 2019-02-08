import util from 'js/util.js'

function fetch(url, param) {
  return new Promise((resolve, reject) => {
    util.ajax(url, param).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch
