import React from 'react';
class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: []
    }
  }
  componentWillReceiveProps(nextprops) {
    console.log(nextprops, 'nextprops')
    if (nextprops.posts)
      this.setState({
        arr: nextprops.posts.map(post => {
          console.log(post)
          return < h1 > {post.text}</h1 >
        })
      })
  }
  render() {
    console.log(this.state.arr, 'array of posts')
    if (this.state.arr.length > 0) {
      return (<div onClick={this.handleDivClick.bind(this)}>{this.state.arr}</div>)
    }
    else if (this.state.arr.length === 0) {
      return (<div onClick={this.handleDivClick.bind(this)}>no posts to show</div>)
    }
    return <div onClick={this.handleDivClick.bind(this)}></div>

  }

}
export default PostList;