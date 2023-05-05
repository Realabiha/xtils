/*
  {
    tag: head
    children: [
      {
        tag: style
      }
    ]
  }
*/

let result = {}
const domToJson = function (selector) {
  const dom = selector instanceof Element ? selector : document.querySelector(selector)
  const { tagName, children } = dom
  const node = { tag, children: [] }
}