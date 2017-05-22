import React, { Component } from 'react'
import { VioletPaginator, VioletDataTable } from 'violet-paginator'
import { connect } from 'react-redux'
import { preloaded } from './recipesConfig'
//App组件的内容
export default function App() {
  //表格头部
  const headers = [{
    field: 'name',
    text: '姓名',
    sortable: false
  }]
 //其中preloaded是如下的内容
 //export default {
//   listId: 'recipes',
//   fetch: mockFetch,
//   pageParams: {
//     totalCountProp: 'totalCount'
//   },
//   initialSettings: {
//     pageSize: 1
//   }
// }
  return(
    <div>
      <h1>Hello World!</h1>
      {/*listId指定的就是reducer的key的值，即
         const reducer = combineReducers({
          recipes: createPaginator(config)
        })
      */}
      <VioletPaginator listId="recipes" />
      <VioletDataTable listId="recipes" preloaded={preloaded} headers={headers} />
    </div>
  )
}
