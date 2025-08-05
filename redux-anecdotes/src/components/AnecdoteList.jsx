import { useDispatch, useSelector } from 'react-redux'

import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    ).sort((a, b) => b.votes - a.votes)
  })

  const handleVote = (id) => {
    dispatch(voteFor(id))

    dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList