const initialState = {
  messages: [],
  username: "",
  roomname: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case "SIGN_IN":
      return {...state, username: action.username}
    case 'ADD_MESSAGE':
      return {...state, messages: [...state.messages, action.message]}
    case 'ADD_CHANNEL':
      return {...state, roomname: action.roomname}
    default:
      return state
  }
}

