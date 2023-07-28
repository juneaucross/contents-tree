export function useBuildTree(pages, rootLevelKeys) {
  const _pages = structuredClone(pages);
  const result = [];

  const queue = rootLevelKeys.map((key) => {
    result.push(_pages[key]);
    return _pages[key];
  });

  while (queue.length) {
    const currentPage = queue.shift();

    if (currentPage?.childPageKeys) {
      currentPage.children = currentPage.childPageKeys.map((key) => {
        queue.push(_pages[key]);
        return _pages[key];
      });
    }
  }

  return result;
}
