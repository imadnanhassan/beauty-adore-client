
import { Clock, Gift, Zap, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 1,
      title: "Flash Sale",
      subtitle: "Up to 70% OFF",
      description: "Limited time beauty essentials",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
      textColor: "text-white",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Buy 2 Get 1 FREE",
      subtitle: "Skincare Bundle",
      description: "Mix & match any skincare products",
      icon: Gift,
      gradient: "from-green-400 to-emerald-500",
      textColor: "text-white",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "New Customer",
      subtitle: "25% OFF",
      description: "First order discount + free shipping",
      icon: Tag,
      gradient: "from-purple-400 to-indigo-500",
      textColor: "text-white",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <section className="main-container py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Special Offers
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these amazing deals and exclusive offers
        </p>
      </div>

      {/* Main Flash Sale Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <Clock className="h-8 w-8 mr-3" />
              <span className="text-xl font-semibold">Limited Time Offer</span>
            </div>
            <h3 className="text-5xl font-bold mb-4">MEGA BEAUTY SALE</h3>
            <p className="text-xl mb-6 opacity-90">
              Up to 60% OFF on premium beauty products
            </p>

            {/* Countdown Timer */}
            <div className="flex space-x-4 mb-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[60px]">
                    <div className="text-2xl font-bold">
                      {value.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-sm mt-1 capitalize opacity-80">
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Shop Now
            </Button>
          </div>

          <div className="hidden lg:block">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Beauty Sale"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const IconComponent = offer.icon;
          return (
            <div
              key={offer.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 transform hover:scale-105"
            >
              <div
                className={`bg-gradient-to-r ${offer.gradient} p-6 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative z-10">
                  <IconComponent
                    className={`h-8 w-8 ${offer.textColor} mb-3`}
                  />
                  <h3 className={`text-2xl font-bold ${offer.textColor} mb-1`}>
                    {offer.title}
                  </h3>
                  <p className={`text-lg ${offer.textColor} opacity-90`}>
                    {offer.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="mb-4">
                  <img
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  Claim Offer
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Newsletter Signup CTA */}
      <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Get Exclusive Offers
        </h3>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and be the first to know about new deals
          and products
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors duration-200"
          />
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
