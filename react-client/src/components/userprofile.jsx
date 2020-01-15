import React from "react";
import ReactDOM from "react-dom";
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
      <div className='container'>
        <div className="wrapper">
          <div className="box">
            <div className="row row-offcanvas row-offcanvas-left">

              {/* <!-- sidebar --> */}
              <div className="column col-sm-2 col-xs-1 sidebar-offcanvas" id="sidebar">

                <ul className="nav">
                  <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i className="glyphicon glyphicon-chevron-right"></i></a></li>
                </ul>

                <ul className="nav hidden-xs" id="lg-menu">
                  <li className="active"><a href="#featured"><i className="glyphicon glyphicon-list-alt"></i> Featured</a></li>
                  <li><a href="#stories"><i className="glyphicon glyphicon-list"></i> Stories</a></li>
                  <li><a href="#"><i className="glyphicon glyphicon-paperclip"></i> Saved</a></li>
                  <li><a href="#"><i className="glyphicon glyphicon-refresh"></i> Refresh</a></li>
                </ul>
                <ul className="list-unstyled hidden-xs" id="sidebar-footer">
                  <li>
                    <a href="http://usebootstrap.com/theme/facebook"><h3>Bootstrap</h3> <i className="glyphicon glyphicon-heart-empty"></i> Bootply</a>
                  </li>
                </ul>

                {/* <!-- tiny only nav--> */}
                <ul className="nav visible-xs" id="xs-menu">
                  <li><a href="#featured" className="text-center"><i className="glyphicon glyphicon-list-alt"></i></a></li>
                  <li><a href="#stories" className="text-center"><i className="glyphicon glyphicon-list"></i></a></li>
                  <li><a href="#" className="text-center"><i className="glyphicon glyphicon-paperclip"></i></a></li>
                  <li><a href="#" className="text-center"><i className="glyphicon glyphicon-refresh"></i></a></li>
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
                    <a href="http://usebootstrap.com/theme/facebook" className="navbar-brand logo">b</a>
                  </div>
                  <nav className="collapse navbar-collapse" role="navigation">
                    <form className="navbar-form navbar-left">
                      <div className="input-group input-group-sm" style={{ maxWidth: "360px" }}>
                        <input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" />
                        <div className="input-group-btn">
                          <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                        </div>
                      </div>
                    </form>
                    <ul className="nav navbar-nav">
                      <li>
                        <a href="#"><i className="glyphicon glyphicon-home"></i> Home</a>
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
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
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
                  <div className="full col-sm-9">

                    {/* <!-- content --> */}
                    <div className="row">

                      {/* <!-- main col left --> */}
                      <div className="col-sm-5">

                        <div className="panel panel-default">
                          <div className="panel-thumbnail"><img src={bg_5} className="img-responsive" /></div>
                          <div className="panel-body">
                            <p className="lead">Urbanization</p>
                            <p>45 Followers, 13 Posts</p>

                            <p>
                              <img src={uFp_tsTJboUY7kue5XAsGAs28} height="28px" width="28px" />
                            </p>
                          </div>
                        </div>


                        <div className="panel panel-default">
                          <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Bootstrap Examples</h4></div>
                          <div className="panel-body">
                            <div className="list-group">
                              <a href="http://usebootstrap.com/theme/facebook" className="list-group-item">Modal / Dialog</a>
                              <a href="http://usebootstrap.com/theme/facebook" className="list-group-item">Datetime Examples</a>
                              <a href="http://usebootstrap.com/theme/facebook" className="list-group-item">Data Grids</a>
                            </div>
                          </div>
                        </div>

                        <div className="well">
                          <form className="form-horizontal" role="form">
                            <h4>What's New</h4>
                            <div className="form-group" style={{ padding: "14px" }}>
                              <textarea className="form-control" placeholder="Update your status"></textarea>
                            </div>
                            <button className="btn btn-primary pull-right" type="button">Post</button><ul className="list-inline"><li><a href=""><i className="glyphicon glyphicon-upload"></i></a></li><li><a href=""><i className="glyphicon glyphicon-camera"></i></a></li><li><a href=""><i className="glyphicon glyphicon-map-marker"></i></a></li></ul>
                          </form>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>More Templates</h4></div>
                          <div className="panel-body">
                            <img src={gif150} className="img-circle pull-right" /> <a href="#">Free @Bootply</a>
                            <div className="clearfix"></div>
                            There a load of new free Bootstrap 3
           ready templates at Bootply. All of these templates are free and don't
          require extensive customization to the Bootstrap baseline.
											<hr />
                            <ul className="list-unstyled"><li><a href="http://usebootstrap.com/theme/facebook">Dashboard</a></li><li><a href="http://usebootstrap.com/theme/facebook">Darkside</a></li><li><a href="http://usebootstrap.com/theme/facebook">Greenfield</a></li></ul>
                          </div>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-heading"><h4>What Is Bootstrap?</h4></div>
                          <div className="panel-body">
                            Bootstrap is front end frameworkto
          build custom web applications that are fast, responsive &amp; intuitive.
           It consist of CSS and HTML for typography, forms, buttons, tables,
          grids, and navigation along with custom-built jQuery plug-ins and
          support for responsive layouts. With dozens of reusable components for
		navigation, pagination, labels, alerts etc..                          </div>
                        </div>



                      </div>

                      {/* <!-- main col right --> */}
                      <div className="col-sm-7">

                        <div className="well">
                          <form className="form">
                            <h4>Sign-up</h4>
                            <div className="input-group text-center">
                              <input className="form-control input-lg" placeholder="Enter your email address" type="text" />
                              <span className="input-group-btn"><button className="btn btn-lg btn-primary" type="button">OK</button></span>
                            </div>
                          </form>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Bootply Editor &amp; Code Library</h4></div>
                          <div className="panel-body">
                            <p><img src={gif150} className="img-circle pull-right" /> <a href="#">The Bootstrap Playground</a></p>
                            <div className="clearfix"></div>
                            <hr />
                            Design, build, test, and prototype
          using Bootstrap in real-time from your Web browser. Bootply combines the
           power of hand-coded HTML, CSS and JavaScript with the benefits of
          responsive design using Bootstrap. Find and showcase Bootstrap-ready
          snippets in the 100% free Bootply.com code repository.
										  </div>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Stackoverflow</h4></div>
                          <div className="panel-body">
                            <img src={gif150} className="img-circle pull-right" /> <a href="#">Keyword: Bootstrap</a>
                            <div className="clearfix"></div>
                            <hr />

                            <p>If you're looking for help with Bootstrap code, the <code>twitter-bootstrap</code> tag at <a href="http://stackoverflow.com/questions/tagged/twitter-bootstrap">Stackoverflow</a> is a good place to find answers.</p>

                            <hr />
                            <form>
                              <div className="input-group">
                                <div className="input-group-btn">
                                  <button className="btn btn-default">+1</button><button className="btn btn-default"><i className="glyphicon glyphicon-share"></i></button>
                                </div>
                                <input className="form-control" placeholder="Add a comment.." type="text" />
                              </div>
                            </form>

                          </div>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Portlet Heading</h4></div>
                          <div className="panel-body">
                            <ul className="list-group">
                              <li className="list-group-item">Modals</li>
                              <li className="list-group-item">Sliders / Carousel</li>
                              <li className="list-group-item">Thumbnails</li>
                            </ul>
                          </div>
                        </div>

                        <div className="panel panel-default">
                          <div className="panel-thumbnail"><img src={bg_4} className="img-responsive" /></div>
                          <div className="panel-body">
                            <p className="lead">Social Good</p>
                            <p>1,200 Followers, 83 Posts</p>

                            <p>
                              <img src={photojpg} height="28px" width="28px" />
                              <img src={photopng} height="28px" width="28px" />
                              <img src={photo2} height="28px" width="28px" />
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <!--/row--> */}

                    <div className="row">
                      <div className="col-sm-6">
                        <a href="#">Twitter</a> <small className="text-muted">|</small> <a href="#">Facebook</a> <small className="text-muted">|</small> <a href="#">Google+</a>
                      </div>
                    </div>

                    <div className="row" id="footer">
                      <div className="col-sm-6">

                      </div>
                      <div className="col-sm-6">
                        <p>
                          <a href="#" className="pull-right">©Copyright 2013</a>
                        </p>
                      </div>
                    </div>

                    <hr />

                    <h4 className="text-center">
                      <a href="http://usebootstrap.com/theme/facebook" target="ext">Download this Template @Bootply</a>
                    </h4>

                    <hr />


                  </div>
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

export default profile;
