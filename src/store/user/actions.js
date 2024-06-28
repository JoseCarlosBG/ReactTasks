// actions.js

import * from './types.js'

const addUserAction = (payload) => ({ type: ADD_USER, payload });
const deleteUserAction = (payload) => ({ type: DELETE_USER, payload });
const saveUsersAction = (payload) => ({ type: SAVE_USERS, payload });
