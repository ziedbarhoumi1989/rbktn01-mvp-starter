import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import { Redirect } from "react-router-dom";
//import List from "./components/List.jsx";
class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      newUser: "",
      newAge: "",
      newEmail: "",
      newPassword: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }
  handleSignin(event) {
    event.preventDefault();
    this.setState({ redirect: !this.state.redirect });
    axios
      .post("/api/user", this.state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      [name]: ''
    });
  }
  render() {
    if (this.state.redirect) return <Redirect to="user" />;
    var inputStyle = { width: "200px", height: "30px" };

    const {
      username,
      password,
      newUser,
      newAge,
      newEmail,
      newPassword
    } = this.state;
    return (
      <div style={{ backgroundColor: 'green' }}>
        hhhhhhhhhhhh
      </div>
    );
  }
}
export default profile;
