import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '~/lib/api'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.token = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        role
      })
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token)
      }
      return response.data.token
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.token)
      }
      return response.data.token
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const { clearError, setToken, logout } = authSlice.actions
export default authSlice.reducer
