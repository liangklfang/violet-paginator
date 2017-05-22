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
