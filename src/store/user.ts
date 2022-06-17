import create from 'zustand'
import axios from 'redaxios'

interface LogInPayload {
  email: string
  password: string
}

interface LogInResponse {
  token: string
}

interface LogInErrorResponse {
  data: { error: string } 
}

interface UserStore {
  user: string
  isLoading: boolean
  error: string
  logIn: (payload: LogInPayload) => Promise<void>
  logOut: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: '',
  isLoading: false,
  error: '',
  logIn: async (payload: LogInPayload) => {
    try {
      set({ isLoading: true, error: '' })
      const { data } = await axios.post<LogInResponse>('https://reqres.in/api/login', payload)
      set({ user: data.token })
    } catch (error) {
      set({ error: (error as LogInErrorResponse).data.error })
    } finally {
      set({ isLoading: false })
    }
  },
  logOut: () => {
    set({ user: '' })
  }
}))
