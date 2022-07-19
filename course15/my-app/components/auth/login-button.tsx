import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <>
        歡迎， {session!.user!.email!} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      尚未登入 <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}