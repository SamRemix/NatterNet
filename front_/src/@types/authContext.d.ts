export type AuthContextProps = {
  token: string | null,
  register: (token: string) => void,
  logOut: () => void
}