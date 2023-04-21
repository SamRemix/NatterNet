export type AuthContextProps = {
  auth: any | null,
  register: (auth: any) => void,
  logOut: () => void
}