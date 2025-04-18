import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import LoginForm from "@/components/auth/login-form"
// import "/globals.css";
export default async function Home() {
  const session = await getSession()

  if (session) {
    redirect("/chat")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <img className="logo-login " src="/logo.jpg" />
        <h1 className="mb-8 text-center text-white text-3xl font-bold">Welcome to Askdemia</h1>
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

