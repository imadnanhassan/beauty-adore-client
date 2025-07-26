import { useState, useEffect, useMemo } from "react";
import { Sparkles, Heart, Star, Leaf } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HomePage = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Set launch date (30 days from now)
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 29); // Set launch to 29 days from today
    return date;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Natural Aurora Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-teal-400 to-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-r from-lime-300 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-1000"></div>
      </div>

      {/* Floating Natural Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Leaf className="absolute top-20 left-20 text-green-400 w-6 h-6 animate-pulse" />
        <Sparkles className="absolute top-32 right-32 text-emerald-400 w-5 h-5 animate-bounce" />
        <Leaf className="absolute bottom-32 left-32 text-teal-400 w-4 h-4 animate-ping" />
        <Heart className="absolute bottom-20 right-20 text-green-400 w-5 h-5 animate-pulse animation-delay-1000" />
        <Star className="absolute top-1/2 left-1/4 text-lime-400 w-4 h-4 animate-bounce animation-delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Glass Card Container */}
        <div className="backdrop-blur-lg bg-white/25 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 max-w-4xl w-full animate-fade-in">
          {/* Company Name */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x mb-4">
              Beauty Adore
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              Natural Beauty & Skincare
            </p>
          </div>

          {/* Coming Soon Text */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
              Nature's Beauty is Coming
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover the power of nature with our revolutionary organic beauty
              products. Pure botanical ingredients meet innovative science for
              naturally radiant, healthy skin.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="text-2xl text-gray-800 font-semibold mb-6">
              We are launching in <span className="text-teal-600">29 days</span>{" "}
              in the biggest way!
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="backdrop-blur-md bg-white/35 rounded-2xl p-4 md:p-6 border border-green-200 transform hover:scale-105 transition-all duration-300 hover:bg-white/40"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 animate-pulse">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Subscription */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Join Our Natural Beauty Journey
            </h3>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full backdrop-blur-md bg-white/40 border border-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Notify Me
                </button>
              </div>
            </form>

            {isSubscribed && (
              <div className="mt-4 p-4 backdrop-blur-md bg-green-100/60 border border-green-200/60 rounded-2xl animate-fade-in">
                <p className="text-green-700 font-medium">
                  🌿 Thank you! You'll be the first to experience natural
                  beauty.
                </p>
              </div>
            )}
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Sparkles className="text-teal-600 w-8 h-8 mb-4 animate-bounce" />
              <p className="text-lg text-gray-700">Pure Ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="text-pink-600 w-8 h-8 mb-4 animate-pulse" />
              <p className="text-lg text-gray-700">Healthy Skin</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="text-yellow-600 w-8 h-8 mb-4 animate-ping" />
              <p className="text-lg text-gray-700">Radiant Glow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
