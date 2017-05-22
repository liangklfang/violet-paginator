### 1.客户端
```js
import { i18nReducer } from 'react-redux-i18n'
//国际化的reducer
import { combineReducers } from 'redux'
import { createPaginator } from 'violet-paginator'
import recipes from './recipes/reducer'
import fetch from './recipes/actions'
//使用combineReducers来组合多个reducer
export default combineReducers({
 //只是将connect设置为true
  recipes,
  //高阶reducer
  recipeGrid: createPaginator({
    listId: 'recipeGrid',
    fetch
  }),
  //国际化资源
  i18n: i18nReducer
})
```

### 2.服务端渲染
```js
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
function handleRender(req, resp) {
  const reducer = combineReducers({
    recipes: createPaginator(config)
  })
  //得到我们的reducer,其中config的内容如上
  const store = createStore(reducer, compose(applyMiddleware(thunk)))
  const html = renderToString(
    <Provider store={store}>
      <App />
    <\/Provider>
  )
  resp.send(template({
    body: html,
    preloadedState: store.getState()
  }))
}
app.listen(port)
```
