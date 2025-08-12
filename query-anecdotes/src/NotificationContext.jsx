import { createContext, useReducer, useContext } from "react"

import PropTypes from 'prop-types'

const notificationReducer = ( state, action ) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotification = () => {
  const contextAndDispatch = useContext(NotificationContext)
  return contextAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const contextAndDispatch = useContext(NotificationContext)
  return contextAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext