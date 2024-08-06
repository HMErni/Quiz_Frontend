import { createSlice } from '@reduxjs/toolkit';

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from local storage', err);
  }
};

const deleteStateFromLocalStorage = () => {
  try {
    localStorage.removeItem('authState');
  } catch (err) {
    console.error('Could not delete state from local storage', err);
  }
};

const initialState = loadStateFromLocalStorage() || {
  isAuthenticated: false,
  userId: null,
  userName: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAuth: (state, action) => {
      const newState = {
        ...state,
        isAuthenticated: true,
        userId: action.payload.id,
        userName: action.payload.username,
        role: action.payload.role,
      };
      saveStateToLocalStorage(newState);
      return newState;
    },
    logoutAuth: () => {
      deleteStateFromLocalStorage();
      return initialState;
    },
  },
});

export const { loginAuth, logoutAuth } = authSlice.actions;

export default authSlice.reducer;
