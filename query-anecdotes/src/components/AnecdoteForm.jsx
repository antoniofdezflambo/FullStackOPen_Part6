import { useQueryClient, useMutation, QueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'

import { createAnecdote } from '../requests/requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatchNotification({ type: 'SET_NOTIFICATION', message: `Error: Too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const dispatchNotification = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const id = (100000 * Math.random()).toFixed(0)

    newAnecdoteMutation.mutate({ content, id: id, votes: 0 })

    dispatchNotification({ type: 'SET_NOTIFICATION', message: `Anecdote "${content}" has been created` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
