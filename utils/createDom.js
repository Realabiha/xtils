/*
{
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
*/


const vdom = {
  tag: 'DIV',
  attrs: {
    id: 'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
function createDom(data) {
  const { children = [], tag, attrs = {} } = data
  const dom = document.createElement(tag)
  Object.keys(attrs).forEach(attr => dom.setAttribute(attr, attrs[attr]))
  children.forEach(child => {
    dom.appendChild(createDom(child))
  })
  return dom
}

document.body.appendChild(createDom(vdom))