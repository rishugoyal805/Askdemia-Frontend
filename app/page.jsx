import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import LoginForm from "@/components/auth/login-form"

export default async function Home() {
  const session = await getSession()

  if (session) {
    redirect("/chat")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-white text-3xl font-bold">Welcome to AI Chatbot</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <a href="/signup" className="font-medium text-white hover:text-gray-50">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

