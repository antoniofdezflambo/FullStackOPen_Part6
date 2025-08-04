import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { setAnecdotes } from './reducers/anecdoteReducer'

import noteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  return (
    <div>
      <Notification />

      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />

      <h2>New Anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App