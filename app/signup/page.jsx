import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import SignupForm from "@/components/auth/signup-form"
import { HiOutlineLightBulb } from "react-icons/hi"

export default async function SignupPage() {
  const session = await getSession()

  if (session) {
    redirect("/chat")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <HiOutlineLightBulb className="h-20 w-20 text-white mb-4" />
          <span className="text-3xl font-bold text-white">Askdemia</span>
        </div>
        <h1 className="mb-8 text-center text-3xl text-white font-bold">Create an Account</h1>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-white">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-50 hover:text-white">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

