import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { loadTranslations, setLocale, syncTranslationWithStore, I18n } from 'react-redux-i18n'
//redux应用的国际化
import '../styles.scss'
//引入css
import translations from 'CONF/locales'
import { configurePageParams } from 'violet-paginator'
//设置我们的分页配置
import reducers from './reducers'
import App from './App'
//因为不同的后端服务器使用不同的属性用于排序和分页，所以我们这里可以配置的
configurePageParams({
  perPage: 'results_per_page',
  sortOrder: 'sort_reverse',
  sortReverse: true
})
//发送的请求的url为如下类型:
//https://brewed-dev.herokuapp.com/v1/recipes?page=1&results_per_page=15
const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), devtools)
)
//创建store，同时添加相应的中间件

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations))
//其中translation是下面的签名
//export default {
//   en
// }
store.dispatch(setLocale('en')) 
// TODO: resolve dynamically
//我们store中的数据都会动态被解析，调用setLocale来设置语言
ReactDOM.render((
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
), document.getElementById('app'))
