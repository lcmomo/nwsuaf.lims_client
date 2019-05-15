/**
 * 跟多个 path 获取经过的所有菜单树路径节点
 *
 */
export const getMenuTreePath = (keys, treeData, haveCurNode = false, isObject = false) => {
    let result = [];
  
    function find(key, tree, path) {
      tree.forEach(e => {
        if (e.path === key) {
          // 找到目标
          result = haveCurNode ?
          [...result, ...path, isObject ? { path: e.path, name: e.name } : e.path]
          : [...result, ...path];
        } else if (e.children && e.children.length > 0) {
          find(key, e.children, [...path, isObject ? { path: e.path, name: e.name } : e.path]);
        }
      });
    }
  
    keys.forEach(i => {
      find(i, treeData, []);
    });
    return [...new Set(result)];
  };