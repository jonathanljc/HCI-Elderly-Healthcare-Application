export default function AuthWrapper({ children }) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Vibrant Background */}
      <div className="fixed inset-0 -z-10">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />

        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[400px] space-y-6 z-10">
        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <div className="w-10 h-10 text-blue-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ElderlyHealth</h1>
          <p className="text-gray-600 mt-2">Your daily health companion</p>
        </div>

        {/* White Card with Glassmorphism */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 ring-1 ring-gray-900/5">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl" />

          {/* Content */}
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
