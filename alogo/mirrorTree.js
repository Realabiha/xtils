/*
  完全对称二叉树
        1
    2       2
  3   3   4   4
  对称二叉树
        1
    2       2
  3           3
  左右对称
*/
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 3 }
  },
  right: {
    value: 2,
    left: { value: 3 },
    right: { value: 4 }
  }
}

/*
  根节点
*/
const mirrorTree = function (root) {
  const { left, right } = root
  // 左右节点都存在对比子节点
  if (left && right) {
    return isMirrored(left, right)
  }
  // 只存在一个子节点
  else if (left || right) {
    return false
  }
  // 不存在子节点
  else {
    return true
  }
}


/*
  子节点 对称
  root.left.right vs root.right.left
  root.left.left vs root.right.right
*/
function isMirrored(left, right) {
  // 值不相等
  if (left.value !== right.value) return false
  let result = true
  if (left.left && right.right) {
    result = result && isMirrored(left.left, right.right)
  } else if (left.left || right.right) {
    return false
  }
  if (left.right && right.left) {
    result = result && isMirrored(left.right, right.left)
  } else if (left.right || right.left) {
    return false
  }
  return result
}




console.log(mirrorTree(tree))