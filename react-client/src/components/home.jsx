import React from "react";
import { Route, Redirect } from 'react-router-dom'
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isauthentified: false }
  }


  render() {

    var a = localStorage.getItem('user')
    console.log(a)
    if (a === null) {
      return <Redirect to='/signin' />
    }
    if (a) {
      return <Redirect to='/user' />
    }
    else {
      <Redirect to='/signin' />
    }

  }
}
