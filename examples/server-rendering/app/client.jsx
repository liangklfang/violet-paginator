import Immutable from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import { createPaginator } from 'violet-paginator'
//createPaginator用于combineReducers
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import config from './recipesConfig'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__
//这是服务器端发送过来的store的初始状态
console.log(preloadedState)
const reducer = combineReducers({
  recipes: createPaginator(config)
})
//客户端也要使用combineReducers，在服务器端的中间件也会调用combineReducer
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

const store = createStore(reducer, {
//其中createStore第二个参数表示preState
//[preloadedState] (any): The initial state. You may optionally specify it to 
//hydrate the state from the server in universal apps, or to restore a previously
// serialized user session. If you produced reducer with combineReducers, this
// must be a plain object with the same shape as the keys passed to it. Otherwise,
//  you are free to pass anything that your reducer can understand.
  recipes: Immutable.fromJS(preloadedState.recipes)
}, compose(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

