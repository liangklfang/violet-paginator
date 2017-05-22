import api from 'ROOT/api'
//ROOT就是上一层目录
import * as actionTypes from './actionTypes'
//接收一个pageInfo作为参数
export default function fetchRecipes(pageInfo) {
  return dispatch =>
    api.recipes.index(pageInfo.query).then(resp => {
      dispatch({ type: actionTypes.CONNECTED })
      return resp
    })
}
//我接收到一个消息后，直接dispatch一个action,其中type为CONNECTED
// recipes: {
// index: (filters={}) =>
//   api().get('/recipes', { params: { ...filters } }),
// show: (id) =>
//   api().get(`/recipes/${id}`)
// }
