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
      email: "",
      password: "",
      newUser: "",
      newAge: "",
      newEmail: "",
      newPassword: "",
      newPassword2: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    // console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state));


  }
  handleSignin(event) {
    event.preventDefault();
    //this.setState({ redirect: !this.state.redirect });
    axios
      .post("/api/usersignin", this.state)
      .then(response => {
        console.log(response.data.success)

        if (response.data.success) {
          this.setState({ redirect: true })
          console.log(typeof (response.data.token))
          localStorage.setItem('user', JSON.stringify(response.data))
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  handleRegister(event) {
    event.preventDefault();
    const that = this
    //this.setState({ redirect: !this.state.redirect });
    axios
      .post("/api/usersignup", this.state)
      .then(response => {
        console.log(response);
        if (response.data === "user added successfully") {
          this.setState({ redirect: true });
        }
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
      email,
      password,
      newUser,
      newAge,
      newEmail,
      newPassword, newPassword2
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
                type="email"
                value={email}
                name="email"
                placeholder="enter your email"
                onChange={this.handleChange}
                required
              ></input>
              <input
                type="password"
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
          <form onSubmit={this.handleRegister.bind(this)}>
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
                name="newEmail"
                required
              ></input>
            </label>
            <br></br>
            <label>
              {" "}
              password:<br></br>
              <input
                type="password"
                style={inputStyle}
                value={newPassword}
                onChange={this.handleChange.bind(this)}
                name="newPassword"
                required
              ></input>
            </label>
            <br></br>
            <label>
              {" "}
              Confirm password:<br></br>
              <input
                type="password"
                style={inputStyle}
                value={newPassword2}
                onChange={this.handleChange.bind(this)}
                name="newPassword2"
                required
              ></input>
            </label>
            <br></br>
            <input type="submit" value="register" ></input>
          </form>
        </div>
      </div>
    );
  }
}
export default First;
