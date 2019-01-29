import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'


class New extends Component {

  state = {
    newChannel: ""
  }
  
  handleSubmit = e => {
    e.preventDefault()
  }

  handleChange = e => {
    this.setState({
      [e.target.newChannel]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="newChannel" placeholder="Channel Name" value={this.state.newChannel} onChange={this.handleChange}></input>
        <button type="submit">Add channel</button>
      </form>
    )
  }
}

export default New
