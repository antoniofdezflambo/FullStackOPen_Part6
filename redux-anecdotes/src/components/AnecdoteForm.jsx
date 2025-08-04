import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(newAnecdote))

    dispatch(setNotification(`Anecdote '${content}' has been created`))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, 5000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default AnecdoteForm