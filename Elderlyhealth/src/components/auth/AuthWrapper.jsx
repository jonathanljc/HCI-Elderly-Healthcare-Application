export default function AuthWrapper({ children }) {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="auth-background">
        {/* Animated Blobs */}
        <div className="blob blob-1 animate-blob" />
        <div className="blob blob-2 animate-blob animation-delay-2000" />
        <div className="blob blob-3 animate-blob animation-delay-4000" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[400px] space-y-8 z-10">
        {/* Logo & Title */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-4 animate-float-slow">
            <div className="text-primary w-10 h-10">
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
          <h1 className="text-2xl font-bold">ElderlyHealth</h1>
          <p className="text-muted-foreground mt-2">
            Your daily health companion
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card hover-lift">
          <div className="card-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
