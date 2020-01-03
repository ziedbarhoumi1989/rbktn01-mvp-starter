import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import { Redirect } from "react-router-dom";
//import List from "./components/List.jsx";
class First extends React.Component {
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
      .post("/user", this.state)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    if (this.state.redirect) return <Redirect to="hello" />;
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
      <div>
        <div id="signin" style={{ height: "40%", marginTop: "0" }}>
          <div
            style={{
              backgroundColor: "lightblue",
              height: "40%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <form onSubmit={this.handleSignin.bind(this)}>
              <input
                type="text"
                value={username}
                name="username"
                placeholder="enter username"
                onChange={this.handleChange}
                required
              ></input>
              <input
                type="text"
                value={password}
                name="password"
                placeholder="enter password"
                onChange={this.handleChange.bind(this)}
                required
              ></input>
              <input type="submit" value="connect"></input>
            </form>
          </div>
        </div>
        <h1>Not registered yet ,..... create account</h1>
        <div
          id="signup"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "150px",
            backgroundImage:
              "url(" +
              "https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" +
              ")"
          }}
        >
          <form>
            <label>
              {" "}
              Username:<br></br>
              <input
                type="text"
                style={inputStyle}
                name="newUser"
                value={newUser}
                onChange={this.handleChange.bind(this)}
                required
              ></input>
            </label>
            <br></br>
            <label>
              {" "}
              Age:<br></br>
              <input
                type="number"
                min="10"
                max="120"
                style={inputStyle}
                value={newAge}
                name="newAge"
                onChange={this.handleChange.bind(this)}
                required
              ></input>
            </label>
            <br></br>
            <label>
              {" "}
              Email:<br></br>
              <input
                type="email"
                style={inputStyle}
                value={newEmail}
                onChange={this.handleChange.bind(this)}
                name="newAge"
                required
              ></input>
            </label>
            <br></br>
            <label>
              {" "}
              password:<br></br>
              <input
                type="text"
                style={inputStyle}
                value={newPassword}
                onChange={this.handleChange.bind(this)}
                name="newPassword"
                required
              ></input>
            </label>
            <br></br>
            <input type="submit" value="register" required></input>
          </form>
        </div>
      </div>
    );
  }
}
export default First;
