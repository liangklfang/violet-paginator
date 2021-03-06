import React, { PropTypes } from 'react'
import Recipes from './recipes/Index'
//App组件的内容，其中内部组件是Recipes
export default function App() {
  return (
    <div>
      <div className="alert">
        <center>
          <h1>VioletPaginator</h1>
          <a target="_blank" href="https://github.com/sslotsky/violet-paginator" className="btn">
            <span className="fa fa-github">
              View On Github
            </span>
          </a>
        </center>
      </div>
      <Recipes />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object
}
