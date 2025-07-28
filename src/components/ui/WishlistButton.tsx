import React from "react";

const WishlistButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-lg  transition-colors duration-200 focus:outline-none ">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
       Wishlist
    </button>
  );
};

export default WishlistButton;
