import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { HiOutlineLightBulb } from "react-icons/hi";
import Image from "next/image";

export default async function HomePage() {
  const session = await getSession();
  return (
    <div className="min-h-screen bg-black text-white relative text-base sm:text-lg md:text-xl">
      {/* Header with Logo */}
      <nav className="sticky top-0 z-50 p-4 flex justify-between items-center border-b border-gray-800 bg-black backdrop-blur-md">
        <div className="flex items-center mr-2 sm:mr-0">
          <HiOutlineLightBulb className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">
            Askdemia
          </span>
        </div>
        <div>
          {session ? (
            <a
              href="/chat"
              className="no-underline px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 text-base sm:text-lg md:text-xl"
            >
              Go to Chat
            </a>
          ) : (
            <div className="flex justify-center space-x-4 sm:space-x-6 overflow-x-auto">
              <a
                href="/login"
                className="no-underline px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 whitespace-nowrap text-base sm:text-lg md:text-xl"
              >
                Login
              </a>
              <a
                href="/signup"
                className="no-underline px-3 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-purple-700 hover:to-blue-600 whitespace-nowrap text-base sm:text-lg md:text-xl"
              >
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              Welcome to Askdemia
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-center">
              Your AI-Powered Study Companion 🎓🤖
            </p>
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
            <p className="text-base sm:text-lg md:text-xl mb-8 text-justify">
              Askdemia is an intelligent student assistant designed to make
              academic life easier and more productive. Powered by AI, it helps
              students clear doubts instantly, manage schedules efficiently,
              stay motivated, and grasp tough concepts through interactive
              learning. Whether you're stuck on a question, feeling unmotivated,
              or need a quick study plan—Askdemia's got your back with a
              personalized and always-available set of AI agents.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
                  📚 Doubt Solver
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-justify">
                  Get instant, accurate answers to your academic queries.
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">📅 Smart Scheduler</h3>
                <p>Plan your study routine and never miss a deadline.</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">🌟 Motivator Agent</h3>
                <p>
                  Daily motivation, quotes, and pep talks when you need them.
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4">🧠 Teaching Agent</h3>
                <p>Learn topics through simple, step-by-step explanations.</p>
              </div>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-12 mb-8">
              Askdemia is not just an app—it's your study buddy for success.
            </p>

            {/* Credits */}
            <div className="text-center text-gray-400 mt-16 pb-8">
              {/* <p className="text-xs sm:text-sm md:text-base">
                Created by:<br />
                Yashita Gogia (B11)<br />
                Swayam Gupta (B9)<br />
                Rishu Goyal (B9)
              </p> */}
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-5 px-4">
      <div className="w-[100%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          <div className="flex gap-4 items-start">
            <Image
              src="/profile.jpg"
              alt="Swayam Gupta Profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">Swayam Gupta</h4>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=swayamsam2005@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                Email
              </a>

              <a
                href="https://www.linkedin.com/in/swayamgupta12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                LinkedIn
              </a>

              <a
                href="https://github.com/SwayamGupta12345"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Image
              src="/profile1.jpg"
              alt="Rishu Goyal Profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">&nbsp;&nbsp;Rishu Goyal</h4>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rishugoyal16800@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                Email
              </a>

              <a
                href="https://www.linkedin.com/in/rishu0405"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                LinkedIn
              </a>

              <a
                href="https://github.com/rishugoyal805"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <Image
              src="/Yashita_profile.jpg"
              alt="Yashita Gogia Profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">Yashita Gogia</h4>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yashita.gogia@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                Email
              </a>

              <a
                href="https://www.linkedin.com/in/yashita-gogia-b05043289/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                LinkedIn
              </a>

              <a
                href="https://github.com/yashita7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline mt-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"

              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
          <p>Made by: Swayam Gupta, Rishu Goyal, Yashita Gogia</p>
        </div>
      </div>
    </footer>
  );
}
