import React, { Component, PropTypes } from 'react'
import DropModal from 'boron/DropModal'
//得到一个动画组件DropModal
export default class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.loading) {
      this.modal.show()
    }
  }
 //组件接收到属性后，判断loading是否存在，如果存在显示它，如果loading为flase
 //那么100ms后隐藏这个模态框
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.modal.show()
    } else {
      setTimeout(() => {
        this.modal.hide()
      }, 1000)
    }
  }

  render() {
    return (
      <DropModal ref={node => this.modal = node}>
             {/*ref可以是一个函数，函数接收一个node参数，设置了this.modal=node，以后可以通过this.modal
        来显示隐藏元素
       */}
        <div className="alert">
          <h1>Connecting to Brewed API...</h1>
        </div>
      </DropModal>
    )
  }
}

