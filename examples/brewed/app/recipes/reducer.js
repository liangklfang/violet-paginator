import { Map } from 'immutable'
import { resolveEach } from 'redux-resolver'
import * as actionTypes from './actionTypes'

const initialState = Map({
  connected: false
})

function connected(state) {
  return state.set('connected', true)
}
//其中CONNECTED就是我们的export const CONNECTED = 'CONNECTED'
//就是使用resolveEach来将[CONNNECTED]设置为true
//返回一个reducer函数，其接收state和action两个参数，然后根据派发的action的action.type
//决定执行handlers中的哪一个函数
export default resolveEach(initialState, {
  [actionTypes.CONNECTED]: connected
})

// export function resolveAll(initialState, register) {
//   return function resolve(state = initialState, action = {}, handlers = register(state, action)) {
//     return handlers[action.type] ? handlers[action.type]() : state
//   }
// }

//其实返回的对象就是我们的一个resolve方法，其接收state与action
// export function resolveEach(initialState, handlers) {
//   return function resolve(state = initialState, action = {}) {
//     return handlers[action.type] ? handlers[action.type](state, action) : state
//   }
// }
