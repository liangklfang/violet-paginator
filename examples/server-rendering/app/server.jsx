import Immutable from 'immutable'
import path from 'path'
import express from 'express'
import React from 'react'
import { createPaginator } from 'violet-paginator'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import config from './recipesConfig'
//服务器端也添加这个Pagination
import App from './App'
import template from './template'
const app = express()
const port = 9999
app.use('/assets', express.static('assets'));
//静态目录
app.use(handleRender)
//添加我们自己的中间件,其中导入的config是如下的类型:
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
// 其中combineReducers也就是指定了，对于我们的recipes属性我们采用后面的这个reducer函数
// 即createPaginator来处理。所以如下的key配置也就是指定了我们采用reducer名字为recipes的
// 处理
//  <VioletPaginator listId="recipes" />
function handleRender(req, resp) {
  const reducer = combineReducers({
    recipes: createPaginator(config)
  })
  //得到我们的reducer,其中config的内容如上
  const store = createStore(reducer, compose(applyMiddleware(thunk)))
  //将我们的App组件渲染成为html字符串发送到客户端去，同时将store发送到客户端
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  //其中传递过去的body是我们将Provider与App都renderToString后的结果
  resp.send(template({
    body: html,
    preloadedState: store.getState()
  }))
}

app.listen(port)
