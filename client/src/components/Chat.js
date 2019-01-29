import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'
import { Link } from 'react-router-dom'
import '../styles/styles.css'


class Chat extends Component {

    state = {
      message: "",
      messTime: ""
    }

    constructor() {
      super();

      var today = new Date(),
          date = today.getUTCHours() + ":" + today.getUTCMinutes();

      this.state = {
          date: date
      };
  }

    componentDidMount(){
      if (!this.props.username){
        this.props.history.push("/")
      }
    }
    // use the const node to look at the messages ref from #room div
    // set this.shouldScrollBottom to equal the combined node heights

    componentWillUpdate(){
      const node = this.refs.messages
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
    }

    // if this.shouldScrollBottom exists from above, 
    // use the const node to look at the messages ref from #room div
    // and set the top of the div equal to the height so the top pushes under the overflow

    componentDidUpdate(){
      if(this.shouldScrollBottom){
        const node = this.refs.messages
        node.scrollTop = node.scrollHeight
      }
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      addMessage({
        message: this.state.message,
        roomname: this.props.match.params.roomname 
      })
    }

    handleClear = e => {
      e.preventDefault(
        this.setState({
          message: ""
        })
      )
    }


  render() {
    return (
      <div id="chatContainer">
        <div className="channelContainer">
          <p><Link to="/">Back to choose username</Link></p>
          <h2>Channels</h2>
          <ul>
              <li className="channels"><Link to='/default'>Default</Link></li>
              <li className="channels"><Link to='/general'>General</Link></li>   
              <li>add li with variable for new channels</li>
          </ul>
          <p>add create new channel button that links to new.js</p>
        </div>
        <div id="roomContainer">
          <div ref="messages" id='room'>
            <h2>{}</h2>
                {this.props.messages.map((message, i) => (
                  <div className="messageP" key={`message` + i}> <p className="username">{this.props.username}:</p> <p className="message">{message.message}</p> <p className="date">Date: {this.state.date}</p></div>
                ))}
          </div>
            <form onSubmit={this.handleSubmit}>
              <input id="message" type="text"  name="message" value={this.state.message} onChange={this.handleChange} onClick={this.handleClear}></input>
              <button id="messageSubmit" type="submit">Submit</button>
            </form>
        </div>
      </div>
    )
  }
}

// have to bring in props to pass down
function mapStateToProps(appState, ownProps) {
  const roomname = ownProps.match.params.roomname
  console.log(appState)
  
  return {
    username: appState.chatReducer.username,
    messages: appState.chatReducer.messages.filter(message => message.roomname === roomname),
    history: ownProps.history
  }
}

export default connect(mapStateToProps)(Chat)