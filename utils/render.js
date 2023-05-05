/**
 * hello {{data}}
 */
function render(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (...args) => data[args[1]])
}
const result = render('hello {{data}}, i am {{name}}', { _data: 'xqg', name: 'abiha' })
console.log(result)