import React from 'react';
import Popup from "reactjs-popup";
class DisplayFriends extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props, 'props')
    var arr = this.props.resultNames.map(name => {
      return <h1>{name.username}</h1>
    })
    console.log(arr)

    if (arr.length > 0) {
      return (<Popup trigger={< button > Trigger</button >} style={{
        position: "right center"
      }}>
        <div>{arr}</div>
      </Popup >)
    } else {
      return (<Popup trigger={< button > Trigger</button >} style={{
        position: "right center"
      }}>
        <div>No Such user found</div>
      </Popup >)
    }

  }

}
DisplayFriends.defaultProps = [{ username: 'user not found' }]
export default DisplayFriends;
