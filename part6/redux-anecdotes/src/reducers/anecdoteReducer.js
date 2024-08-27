import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToChangeIdx = state.findIndex(a => a.id === id);
      const anectdote = state[anecdoteToChangeIdx]

      anectdote.votes = anectdote.votes + 1

      return state;
    },

    createAnecdote: (state, action) => {
      state.push(action.payload)
    },

    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const {
  vote,
  createAnecdote,
  setAnecdotes
} = anecdoteReducer.actions

export default anecdoteReducer.reducer;