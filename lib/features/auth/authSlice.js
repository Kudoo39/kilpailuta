import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/register', {
        email,
        password,
        role
      })
      const { token } = response.data
      localStorage.setItem('token', token) // Store JWT
      return { token, role }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    role: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.role = action.payload.role
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
