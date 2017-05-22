const results = [{
  name: 'Ewe and IPA'
}, {
  name: 'Pouty Stout'
}]
//预加载的results的第一个元素
export const preloaded = {
  results: results.slice(0, 1),
  totalCount: 2
}
//mockFetch返回一个函数是promise
const mockFetch = pageInfo => () => {
  const data = {
    ...preloaded,
    //preloaded表示预先加载的数据
    results: results.slice(pageInfo.query.page - 1, pageInfo.query.page)
    //preloaded会被query.page指定的页码替换掉
  }
  return Promise.resolve({ data })
}
//listId,fetch,pageParams
export default {
  listId: 'recipes',
  //violet-paginator使用高阶reducer函数，而不是使用单个reducer。从而创建了一个reducer
  //同时将该reducer绑定到listId和fetch函数
  fetch: mockFetch,
  //会使用这个fetch方法发送请求，毋须用户手动敢于
  pageParams: {
    totalCountProp: 'totalCount'
   //服务器通过那个字段来返回我们总的字段个数
   //https://sslotsky.gitbooks.io/violet-paginator/content/v/v2.0.0/single_list_configuration.html
  },
  initialSettings: {
    pageSize: 1
  }
}
