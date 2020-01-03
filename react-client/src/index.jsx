import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import $ from "jquery";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import first from "./components/first.jsx";
import home from "./components/home.jsx";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={home} exact />
        <Route path="/signin" component={first} />

        <Route component={Error} />
      </Switch>
    </main>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: []
//     };
//   }

//   componentDidMount() {
//     $.ajax({
//       url: "/items",
//       success: data => {
//         this.setState({
//           items: data
//         });
//       },
//       error: err => {
//         console.log("err", err);
//       }
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Item List</h1>
//         <List items={this.state.items} />
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
