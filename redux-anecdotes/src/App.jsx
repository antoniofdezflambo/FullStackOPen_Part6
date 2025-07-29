import { useSelector, useDispatch } from 'react-redux'

import { voteFor, createAnecdote } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)

    dispatch(voteFor(id))
  }
  
  const newAnecdote = (content) => {
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} voteFor={vote} />

      <h2>create new</h2>
      <AnecdoteForm createAnecdote={newAnecdote} />
    </div>
  )
}

export default App