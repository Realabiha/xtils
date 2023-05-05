function ajax(options) {
  const { method = 'GET', url, data = null, cb = _ => _, header = {} } = options
  const xhr = new XMLHttpRequest()

  Object.keys(header).forEach(key => {
    xhr.setRequestHeader(key, header[key])
  })

  xhr.open(method, url, false)
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    // if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    // }
    cb(xhr)
  }
  data ? xhr.send(data) : xhr.send()
}