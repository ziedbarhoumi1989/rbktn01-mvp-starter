import React from 'react';
import Popup from "reactjs-popup";
class DisplayFriends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: []
    }
  }
  handleDivClick(e) {
    e.target.setAttribute("style", "background-color: red;");
  }
  componentWillReceiveProps(nextprops) {
    console.log(nextprops, 'nextprops')
    if (nextprops.resultNames)
      this.setState({
        arr: nextprops.resultNames.map(name => {
          console.log(name)
          return < h1 > {name.username}</h1 >
        })
      })
  }

  render() {
    //console.log(this.props, 'props')
    // var arr = this.props.resultNames.map(name => {
    //   <h1>{name.username}</h1>
    // })
    console.log(this.state.arr, 'array of jsx')
    if (this.state.arr.length > 0) {
      return (<div onClick={this.handleDivClick.bind(this)}>{this.state.arr}</div>)
    }
    else if (this.state.arr.length === 0) {
      return (<div onClick={this.handleDivClick.bind(this)}>no user found</div>)
    }
    return <div onClick={this.handleDivClick.bind(this)}></div>




  }

}

DisplayFriends.defaultProps = { resultNames: [{ username: 'user not found' }] }
export default DisplayFriends;
