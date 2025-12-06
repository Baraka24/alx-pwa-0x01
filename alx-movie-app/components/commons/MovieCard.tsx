import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath?: string;
  releaseDate?: string;
  voteAverage?: number;
  overview?: string;
  onClick?: () => void;
  imageBaseUrl?: string;
}

/**
 * Movie Card Component
 * Displays a movie card with poster, title, rating, and basic information
 */
const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
  voteAverage,
  overview,
  onClick,
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500',
}) => {
  const movieImageUrl = posterPath ? `${imageBaseUrl}${posterPath}` : '/placeholder-movie.png';
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = voteAverage ? voteAverage.toFixed(1) : 'N/A';

  return (
    <Link href={`/movies/${id}`}>
      <div
        onClick={onClick}
        className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer h-full flex flex-col"
      >
        {/* Poster Image */}
        <div className="relative w-full pt-[150%] bg-gray-700">
          <Image
            src={movieImageUrl}
            alt={title}
            fill
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder-movie.png';
            }}
          />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 rounded-full px-3 py-1 font-bold text-sm">
            {rating}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 hover:text-blue-400 transition">
            {title}
          </h3>

          {/* Year */}
          <p className="text-gray-400 text-sm mb-2">{year}</p>

          {/* Overview */}
          {overview && (
            <p className="text-gray-300 text-xs line-clamp-3 flex-1">
              {overview}
            </p>
          )}

          {/* Watch Button */}
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
