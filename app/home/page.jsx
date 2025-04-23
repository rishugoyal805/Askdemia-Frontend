import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import Image from "next/image"

export default async function HomePage() {
  const session = await getSession()

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header with Logo */}
      <nav className="sticky top-0 z-50 p-4 flex justify-between items-center border-b border-gray-800 bg-black">
        <div className="flex items-center space-x-4">
          <img className="h-12" src="/logo.jpg" alt="Askdemia Logo" />
          <span className="text-2xl font-bold">Askdemia</span>
        </div>
        <div>
          {session ? (
            <a href="/chat" className="text-white hover:text-gray-300">
              Go to Chat
            </a>
          ) : (
            <div className="space-x-4">
              <a href="/login" className="text-white hover:text-gray-300">
                Login
              </a>
              <a href="/signup" className="text-white hover:text-gray-300">
                Sign up
              </a>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Logo Image */}
          <div className="text-center mb-16">
            <div className="relative w-full max-w-md mx-auto h-[300px] mb-12 rounded-xl overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Askdemia Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="text-5xl font-bold mb-8">Welcome to Askdemia</h1>
            <p className="text-xl mb-8">Your AI-Powered Study Companion 🎓🤖</p>
            <div className="space-x-4 mb-12">
              {!session && (
                <a
                  href="/login"
                  className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Get Started
                </a>
              )}
              {session && (
                <a
                  href="/chat"
                  className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Go to Chat
                </a>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-8">
              Askdemia is an intelligent student assistant designed to make academic life easier and more productive. 
              Powered by AI, it helps students clear doubts instantly, manage schedules efficiently, stay motivated, 
              and grasp tough concepts through interactive learning. Whether you're stuck on a question, feeling unmotivated, 
              or need a quick study plan—Askdemia's got your back with a personalized and always-available set of AI agents.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">📚 Doubt Solver</h3>
                <p>Get instant, accurate answers to your academic queries.</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">📅 Smart Scheduler</h3>
                <p>Plan your study routine and never miss a deadline.</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">🌟 Motivator Agent</h3>
                <p>Daily motivation, quotes, and pep talks when you need them.</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">🧠 Teaching Agent</h3>
                <p>Learn topics through simple, step-by-step explanations.</p>
              </div>
            </div>

            <p className="text-xl font-semibold text-center mt-12 mb-8">
              Askdemia is not just an app—it's your study buddy for success.
            </p>

            {/* Credits */}
            <div className="text-center text-gray-400 mt-16 pb-8">
              <p className="text-sm">
                Created by:<br />
                Yashita Gogia (B11)<br />
                Swayam Gupta (B9)<br />
                Rishu Goyal (B9)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}