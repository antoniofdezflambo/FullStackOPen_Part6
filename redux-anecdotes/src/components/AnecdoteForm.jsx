const AnecdoteForm = ( { createAnecdote } ) => {

  const handleSubmit = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    createAnecdote(content)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name='anecdote' />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm