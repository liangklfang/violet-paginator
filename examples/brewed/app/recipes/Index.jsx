import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import {
  VioletFlipper,
  VioletDataTable,
  VioletPaginator,
  VioletPageSizeDropdown
} from 'violet-paginator'
//从violet-paginator引入组件
import { Link } from 'react-router'
import Loading from './Loading'
//引入Loading组件
import fetchRecipes from './actions'
// export default function fetchRecipes(pageInfo) {
//   return dispatch =>
//     api.recipes.index(pageInfo.query).then(resp => {
//       dispatch({ type: actionTypes.CONNECTED })
//       return resp
//     })
// }
// 该函数是真实的用于从服务端获取到数据，它会传递我们的page=1&results_per_page=15
// 等这类参数
export class Index extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    fetch: PropTypes.func.isRequired
  }

  nameColumn(recipe) {
    return (
      <Link to={`/recipes/${recipe.get('id')}`}>
        {recipe.get('name')}
      </Link>
    )
  }

  headers() {
    return [{
      field: 'name',
      text: I18n.t('recipes.name')
    }, {
      field: 'created_at',
      text: I18n.t('recipes.created_at')
    }, {
      field: 'boil_time',
      sortable: false,
      text: I18n.t('recipes.boil_time')
    }]
  }

  render() {
    const { fetch, loading } = this.props
    //fetch用于真实的获取服务器端数据的方法
    //loading表示state中的loading参数的具体值
    const flipper = (
      <VioletFlipper listId="recipeGrid" />
    )
    //listId="recipeGrid"和combineReducer方法中一致
    return (
      <section>
        <Loading loading={loading} />
        <VioletPageSizeDropdown listId="recipeGrid" />
        {/*VioletPageSizeDropdown组件设置了listId="recipeGrid"*/}
        <VioletPaginator listId="recipeGrid"  />
        {/*VioletPaginator组件设置了listId="recipeGrid"*/}
        {flipper}
        {/*VioletFlipper组件设置了listId="recipeGrid"*/}
        <VioletDataTable listId="recipeGrid" headers={this.headers()} />
        {/*VioletDataTable组件设置了listId="recipeGrid"*/}
        {flipper}
        <VioletPaginator listId="recipeGrid" />
        {/*VioletPaginator组件设置了listId="recipeGrid"*/}
      </section>
    )
  }
}
//我们使用了redux来管理应用的state状态，我们的组件connect过了，所以可以接收
//mapStateToProps与mapDispatchToProps两个方法
export default connect(
  function(state)
  {
    //store中的对象和combineReducer方法的key是一样的，这里有
    //i18n,recipeGrid,recipes三个属性
    //调用get方法，说明state.recipes得到的是一个immutable对象
    return {
      loading: !state.recipes.get('connected')
    } 
  },
  { fetch: fetchRecipes }
//fetch方法就是获取所有的Recipes集合
)(Index)
