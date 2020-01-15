import React from 'react';
import axios from 'axios';
class SearchFriends extends React.component {
  constructor(props) {
    super(props)
    this.state = {
      searchUser: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/Search', this.state)
      .then((res) => console.log(res))
      .catch(err => console.log(err))
    this.setState({ searchUser: '' })
  }


  render() {
    return (<div>
      <from onSubmit={this.handleSubmit} >
        <input type= text name='Searched' value={this.state.searchUser} onChange={this.handleChange}></input>
        <button type='submit' >Search</button>

      </from>
    </div>)

  }

}
export default SearchFriends;
