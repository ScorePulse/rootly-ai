import React from "react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  count = 5,
}) => {
  return (
    <div className="flex items-center">
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={`text-3xl focus:outline-none ${
              ratingValue <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(ratingValue)}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
