import React from "react";
import { Route, Redirect } from 'react-router-dom'
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Redirect push to='/signin' />
  }
}
