// actions.js

import * from './types.js'

const addAuthorAction = (payload) => ({ type: ADD_AUTHOR, payload });
const deleteAuthorAction = (payload) => ({ type: DELETE_AUTHOR, payload });
const saveAuthorsAction = (payload) => ({ type: SAVE_AUTHORS, payload });
