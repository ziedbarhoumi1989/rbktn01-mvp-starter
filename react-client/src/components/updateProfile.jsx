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
import photojpg from '../styles/assets/img/photo.jpg'
import photopng from '../styles/assets/img/photo.png'
import uFp_tsTJboUY7kue5XAsGAs28 from '../styles/assets/img/uFp_tsTJboUY7kue5XAsGAs28.png'

//import auth from './../auth/auth-helper'
import Card, { CardHeader, CardContent, CardActions } from '@material-ui/core/Card'
import { typography } from '@material-ui/system';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { remove, like, unlike } from './postHelper.js'

//import List from "./components/List.jsx";
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      srchTerm: '',
      friends: [],
      profile: {},
      pictures: [],
      imageClicked: false,
      redirectedToHome: false,
      redirectedToUser: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }
  handleClick() {
    this.setState({ imageClicked: true })
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
  handleDisconnect() {
    localStorage.removeItem('user')
    this.setState({ redirectedToHome: true })
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    })
  }
  handleHomeClicked() {
    this.setState({ redirectedToUser: true })
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ redirect: !this.state.redirect });
    axios
      .post("/api/friends", this.state)
      .then(response => {
        console.log(response);
        if (response.data.length === 0) {
          response.data.push({ username: 'user not found' })
        }
        this.setState({ friends: response.data })
      })
      .catch(error => {
        this.setState({ friends: [{ username: 'user not found' }] })
        console.log(error);
      });
    this.setState({
      [name]: ''
    });
  }
  render() {

    var inputStyle = { width: "200px", height: "30px" };
    if (this.state.imageClicked) {
      return <ImageUploader
        withIcon={true}
        buttonText='Choose images'
        onChange={this.onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
    }

    const {
      srchTerm,
      friends
    } = this.state;
    if (this.state.redirectedToHome) {
      return <Redirect to='/'></Redirect>
    }
    if (this.state.redirectedToUser) {
      return <Redirect to='/user'></Redirect>
    }
    return (

      <div className='container'>

        <div className="wrapper">
          <div className="box">
            <div className="row row-offcanvas row-offcanvas-left" style={{ backgroundColor: 'silver' }}>

              {/* <!-- sidebar --> */}
              <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar" >

                <ul className="nav" >
                  <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i className="glyphicon glyphicon-chevron-right"></i></a></li>
                </ul>
                <div className="panel panel-default">
                  <div className="panel-thumbnail"><img src={bg_5} className="img-responsive" onClick={this.handleClick} /></div>
                  <div className="panel-body">
                    <p className="lead">Urbanization</p>
                    <p>45 Followers, 13 Posts</p>

                    <p>
                      <img src={uFp_tsTJboUY7kue5XAsGAs28} height="28px" width="28px" />
                    </p>
                  </div>
                </div>


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
                        <input className="form-control" placeholder="Search" name="srchTerm" id="srch-term" type="text" onChange={this.handleChange} value={srchTerm} />
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

                <div className="padding">
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography type="headline" component="h2" className={classes.title}>
                        Edit Profile
          </Typography>
                      <Avatar src={photoUrl} className={classes.bigAvatar} /><br />
                      <input accept="image/*" onChange={this.handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                      <label htmlFor="icon-button-file">
                        <Button variant="raised" color="default" component="span">
                          Upload
              <FileUpload />
                        </Button>
                      </label> <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span><br />
                      <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal" /><br />
                      <TextField
                        id="multiline-flexible"
                        label="About"
                        multiline
                        rows="2"
                        value={this.state.about}
                        onChange={this.handleChange('about')}
                        className={classes.textField}
                        margin="normal"
                      /><br />
                      <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal" /><br />
                      <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal" />
                      <br /> {
                        this.state.error && (<Typography component="p" color="error">
                          <Icon color="error" className={classes.error}>error</Icon>
                          {this.state.error}
                        </Typography>)
                      }
                    </CardContent>
                    <CardActions>
                      <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                    </CardActions>
                  </Card>

                  {/* <!-- /col-9 --> */}
                </div>
                {/* <!-- /padding --> */}
              </div>
              {/* <!-- /main --> */}

            </div>
          </div>
        </div>


        {/* <!--post modal--> */}
        <div id="postModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                Update Status
			  </div>
              <div className="modal-body">
                <form className="form center-block">
                  <div className="form-group">
                    <textarea className="form-control input-lg" autoFocus="" placeholder="What do you want to share?"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <div>
                  <button className="btn btn-primary btn-sm" data-dismiss="modal" aria-hidden="true">Post</button>
                  <ul className="pull-left list-inline"><li><a href=""><i className="glyphicon glyphicon-upload"></i></a></li><li><a href=""><i className="glyphicon glyphicon-camera"></i></a></li><li><a href=""><i className="glyphicon glyphicon-map-marker"></i></a></li></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default UpdateProfile;
