import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assignUsername } from '../actions/chat'


import '../styles/styles.css'

class Home extends Component {
    state = {
        username: ""
    }
    
    handleSubmit = e => {
        e.preventDefault()
        assignUsername(this.state.username).then(() => {
            this.props.history.push('/default')
        })
    }

    handleSubmitWoUser = e => {
        e.preventDefault()
        assignUsername("").then(() => {
            this.props.history.push('/default')
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
            })
          } 

    render (){
            return(
                <div id="login">
                    <h2>Choose a username to be recognized!</h2>
                    <form onSubmit={this.handleSubmit} id="loginForm">
                        <input name='username' className="loginStuff" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter a Username"/>
                        <button className="loginStuff" type="submit">Submit</button>
                    </form>
                </div>
            )

    }
}

function mapStateToProps(appState, ownProps) {
    return {
        username: appState.chatReducer.username,
        history: ownProps.history
    }
  }
  
  export default connect(mapStateToProps)(Home)