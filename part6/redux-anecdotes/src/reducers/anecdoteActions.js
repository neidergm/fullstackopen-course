export const VOTE_ANEC = 'VOTE_ANEC'
export const NEW_ANEC = 'NEW_ANEC'

export const vote = (anecdote) => {
    return {
        type: VOTE_ANEC,
        payload: anecdote
    }
}

export const createAnecdote = (content) => {
    return {
        type: NEW_ANEC,
        data: content
    }
}
