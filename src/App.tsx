import { useUserStore } from "./store/user"

export const App = () => {
  const { logIn, logOut, user, isLoading, error } = useUserStore()

  const handleClick = () => {
    if (user) return logOut()
    logIn({ email: "eve.holt@reqres.in", password: "cityslicka" })
  }

  return (
    <main>
      <p>{user ? 'You are logged in!' : 'Not logged in'}</p>
      {error && <p>{error}</p>}
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading' : !user ? 'Log In' : 'Log Out'}
      </button>
    </main>
  )
}
