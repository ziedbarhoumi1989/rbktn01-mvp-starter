import React from "react";
import ReactDOM from "react-dom";
import DisplayFriends from './searchFriend.jsx'
import Popup from "reactjs-popup";
//import Webcam from "react-webcam";
import ImageUploader from 'react-images-upload';
import $ from "jquery";
import axios from "axios";
import '../styles/assets/css/bootstrap.css'
import '../styles/assets/css/facebook.css';
import { Redirect } from "react-router-dom";
import '../styles/assets/css/bootstrap.css'
import photo2 from '../styles/assets/img/photo_002.jpg'
import gif150 from '../styles/assets/img/150x150.gif'
import bg_4 from '../styles/assets/img/bg_4.jpg'
import bg_5 from '../styles/assets/img/bg_5.jpg'
import photoUrl from '../styles/assets/img/bg_5.jpg'
import photojpg from '../styles/assets/img/photo.jpg'
import photopng from '../styles/assets/img/photo.png'
import uFp_tsTJboUY7kue5XAsGAs28 from '../styles/assets/img/uFp_tsTJboUY7kue5XAsGAs28.png'



//import List from "./components/List.jsx";
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dateOfBirth: "",
      email: "",
      about: "",
      myImage: "",
      redirectedToHome: false,
      redirectedToUser: false
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleClick = this.handleClick.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }
  handleClick() {
    this.setState({ imageClicked: true })
  }
  handleChange (name) {event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value })
  }}
  handleDisconnect() {
    localStorage.removeItem('user')
    this.setState({ redirectedToHome: true })
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    })
  }
  onCHangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleHomeClicked() {
    this.setState({ redirectedToUser: true })
  }
  onSubmitHandler(e) {
    e.preventDefault();
    if (
      this.state.fullname !== "" ||
      this.state.dateOfBirth !== "" ||
      this.state.email !== "" ||
      this.state.about !== "" ||
      this.state.myImage !== ""
    ) {
      let User = {};
      if (localStorage && localStorage.getItem("user")) {
        User = JSON.parse(localStorage.getItem("user"));
        this.setState({
          userId: User.payload.id
        });
      }
      console.log(User)
      var obj = this.state;
      for (var key in obj) {
        if (obj[key] === "") {
          delete obj[key];
        }
      }
      console.log(obj);
      $.ajax({
        url: `/api/users/${User.payload.id}`,
        type: "PUT",
        data: this.state,
        success: data => {
          this.setState({ redirectToProfilePage: true });
        }
      });
    } else {
      this.setState({ redirectToProfilePage: true });
    }
  }
  render() {
    const { fullname, dateOfBirth, email, about, myImage } = this.state;
    var inputStyle = { width: "200px", height: "30px" };




    if (this.state.redirectedToUser) {
      return <Redirect to='/user'></Redirect>
    }

    return (

      <div className='container'>

        <div className="wrapper">
          <div className="box">
            <div className="row row-offcanvas row-offcanvas-left" style={{ backgroundColor: 'blue' }}>

              {/* <!-- sidebar --> */}
              <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar" >

                <ul className="nav" >
                  <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i className="glyphicon glyphicon-chevron-right"></i></a></li>
                </ul>



              </div>
              {/* <!-- /sidebar --> */}

              {/* <!-- main right col --> */}
              <div className="column col-sm-10 col-xs-11" id="main">

                {/* <!-- top nav --> */}
                <div className="navbar navbar-blue navbar-static-top">
                  <div className="navbar-header">
                    <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                      <span className="sr-only">Toggle</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a href='' className="navbar-brand logo">fb</a>
                  </div>
                  <nav className="collapse navbar-collapse" role="navigation">
                    <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
                      <div className="input-group input-group-sm" style={{ maxWidth: "360px" }}>
                        <input className="form-control" placeholder="Search" name="srchTerm" id="srch-term" type="text"
                        />
                        <div className="input-group-btn">
                          <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                        </div>
                      </div>
                    </form>
                    <ul className="nav navbar-nav" style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                      <li>
                        <a href onClick={this.handleHomeClicked.bind(this)}><i className="glyphicon glyphicon-home"></i> Home</a>
                      </li>
                      <li>
                        <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Post</a>
                      </li>
                      <li>
                        <a href="#"><span className="badge">badge</span></a>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
                        <ul className="dropdown-menu">
                          <li><a href="" onClick={this.handleDisconnect.bind(this)}>Disconnect</a></li>
                          <li><a href="">Settings</a></li>
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <!-- /top nav --> */}

                <div className="padding"  style= {{paddingTop:'60px'}}>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
            <fieldset>
              <legend>Edit User Profile</legend>

              <div className="form-group">
                <label htmlFor="fullName">Name </label>
                <input
                  type="text"
                  value={fullname}
                  name="fullname"
                  className="form-control"
                  id="fullName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Full Name"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  name="birthDate"
                  className="form-control"
                  id="dateOfBirth"
                  placeholder="Enter Your Birth Date"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Phone Number</label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your email"
                  onChange={this.onCHangeHandler.bind(this)}
                />

              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  className="form-control"
                  value={about}
                  name="about"
                  id="about"
                  rows="3"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="urlPic">choose a profile photo</label>
                <input type="file" name="myImage" accept="image/*" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </fieldset>
          </form>

                  {/* <!-- /col-9 --> */}
                </div>
                {/* <!-- /padding --> */}
              </div>
              {/* <!-- /main --> */}

            </div>
          </div>
        </div>


        {/* <!--post modal--> */}

      </div >
    )
  }
}

export default UpdateProfile;
