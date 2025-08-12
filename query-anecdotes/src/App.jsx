import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

import { getAnecdotes, vote } from './requests/requests'

const App = () => {
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ))
    },
    onError: (error) => {
      window.alert('Error: Unable to vote for anecdote')
    }
  })

  const dispatchNotification = useNotificationDispatch()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    
    dispatchNotification({ type: 'SET_NOTIFICATION', message: `You voted for "${anecdote.content}"` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
