import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

export default function App() {
  return (
    <div>
      <h1>
        Home Page
      </h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
