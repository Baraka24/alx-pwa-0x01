/**
 * Button Props Interface
 * Used for the commons Button component
 */
export interface ButtonProps {
  title: string;
  action?: () => void;
}

/**
 * Movie Props Interface
 * Used for the MovieCard component
 */
export interface MovieProps {
  title: string;
  posterImage: string;
  releaseYear: number;
}

/**
 * Movies Props Interface
 * Used for API responses
 */
export interface MoviesProps {
  results?: MovieProps[];
  [key: string]: any;
}

/**
 * Component Props Interface
 * Used for the Layout component
 */
export interface ComponentProps {
  children: React.ReactNode;
}
