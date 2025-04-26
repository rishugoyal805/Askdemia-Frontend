import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { HiOutlineLightBulb } from "react-icons/hi"
import Image from "next/image"

export default async function HomePage() {
  const session = await getSession()

function openGmail(email) {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');


  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header with Logo */}
      <nav className="sticky top-0 z-50 p-4 flex justify-between items-center border-b border-gray-800 bg-black">
        <div className="flex items-center space-x-4">
          <HiOutlineLightBulb className="h-8 w-8" />
          <span className="text-2xl font-bold">Askdemia</span>
        </div>
        <div>
          {session ? (
            <a href="/chat" className="no-underline px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700">
              Go to Chat
            </a>
          ) : (
            <div className="space-x-6">
              <a href="/login" className="no-underline px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700">
                Login
              </a>
              <a href="/signup" className="no-underline px-5 py-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-purple-700 hover:to-blue-600">
                Sign up
              </a>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Logo Icon */}
          <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-12">
              <HiOutlineLightBulb className="h-32 w-32 mb-4" />
              <span className="text-4xl font-bold">Askdemia</span>
            </div>
            <h1 className="text-5xl font-bold mb-8">Welcome to Askdemia</h1>
            <p className="text-xl mb-8">Your AI-Powered Study Companion 🎓🤖</p>
            <div className="space-x-4 mb-12">
              {!session && (
                <a
                  href="/login"
                  className="no-underline px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
                >
                  Get Started
                </a>
              )}
              {session && (
                <a
                  href="/chat"
                  className="no-underline px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
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
              <footer class="bg-gray-900 text-white py-10 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Profile 1 -->
      <div class="flex gap-4 items-start">
        <img src="./profile.jpg" alt="Profile Image 1" class="w-16 h-16 rounded-full object-cover">
        <div>
          <h4 class="text-lg font-semibold">Swayam Gupta</h4>
          <p>Email: 
            <a href="#" onclick="openGmail('swayamsam2005@gmail.com'); return false;" class="text-blue-400 hover:underline">E-mail</a>
          </p>
          <ul class="mt-2 space-y-1">
            <li><a href="https://www.linkedin.com/in/swayamgupta12" target="_blank" class="hover:text-blue-300">LinkedIn</a></li>
            <li><a href="https://github.com/SwayamGupta12345" target="_blank" class="hover:text-blue-300">GitHub</a></li>
          </ul>
        </div>
      </div>

      <!-- Profile 2 -->
      <div class="flex gap-4 items-start">
        <img src="profile1.jpg" alt="Profile Image 2" class="w-16 h-16 rounded-full object-cover">
        <div>
          <h4 class="text-lg font-semibold">Rishu Goyal</h4>
          <p>Email: 
            <a href="#" onclick="openGmail('rishugoyal16800@gmail.com'); return false;" class="text-blue-400 hover:underline">E-mail</a>
          </p>
          <ul class="mt-2 space-y-1">
            <li><a href="https://www.linkedin.com/in/rishu0405" target="_blank" class="hover:text-blue-300">LinkedIn</a></li>
            <li><a href="https://github.com/rishugoyal805" target="_blank" class="hover:text-blue-300">GitHub</a></li>
          </ul>
        </div>
      </div>

      <!-- Profile 3 -->
      <div class="flex gap-4 items-start">
        <img src="devyani_profile.jpg" alt="Profile Image 3" class="w-16 h-16 rounded-full object-cover">
        <div>
          <h4 class="text-lg font-semibold">Yashita Gogia</h4>
          <p>Email: 
            <a href="#" onclick="openGmail('Yashita Gogia@gmail.com'); return false;" class="text-blue-400 hover:underline">E-mail</a>
          </p>
          <ul class="mt-2 space-y-1">
            <li><a href="https://www.linkedin.com/in/Yashita Gogia" target="_blank" class="hover:text-blue-300">LinkedIn</a></li>
            <li><a href="https://github.com/Yashita Gogia" target="_blank" class="hover:text-blue-300">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
      <p>Made by: Swayam Gupta, Rishu Goyal, Yashita Gogia</p>
    </div>
  </div>
</footer>

           </div>
          </div>
        </div>
      </main>
    </div>
  )
}
