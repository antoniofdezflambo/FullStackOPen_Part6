import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)
export const createAnecdote = newAnecdote => axios.post(baseUrl, newAnecdote).then(res => res.data)
export const vote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return res.data
}