import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as anecdoteService from "./../services/anecdotes"

const initialState = [];

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload
    }
  },

  extraReducers: builder => {
    builder.addCase(initializeAnecdotes.fulfilled, (state, action) => {
      return action.payload
    })

    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  }

})

export const initializeAnecdotes = createAsyncThunk('anecdotes/fetchAnecdotes', async () => {
  const anecdotes = await anecdoteService.getAll()
  return anecdotes
})

export const createAnecdote = createAsyncThunk('anecdotes/createAnecdote', async (content) => {
  const newAnecdote = await anecdoteService.addAnecdote(content)
  return newAnecdote
})

export const vote = createAsyncThunk('anecdotes/vote', async (id, { getState, dispatch }) => {
  const anecdotes = [...getState().anecdotes];
  const anecdoteToChangeIdx = anecdotes.findIndex(a => a.id === id);

  const anecdoteToChange = anecdotes[anecdoteToChangeIdx];

  const updatedAnecdote = await anecdoteService.voteAnecdote(anecdoteToChange.id, anecdoteToChange.votes + 1)
  anecdotes[anecdoteToChangeIdx] = updatedAnecdote;
  dispatch(setAnecdotes(anecdotes))
})

export const {
  setAnecdotes
} = anecdoteReducer.actions

export default anecdoteReducer.reducer;