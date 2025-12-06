# MoviesDatabase API Documentation

## API Overview

The Movie Database (TMDB) API is a comprehensive RESTful service that provides access to an extensive collection of movie, TV show, and entertainment data. This powerful API enables developers to integrate rich media content into their applications, including detailed information about movies, TV series, cast and crew details, images, ratings, and user reviews. The API offers robust search capabilities, trending content discovery, and personalized recommendations, making it an ideal solution for building entertainment-focused applications, streaming platforms, or content discovery tools.

## Version

**API Version:** 3

The current version of the TMDB API is version 3, which provides stable and well-documented endpoints for accessing the complete movie and TV database.

## Available Endpoints

### Movies
- **GET /movie/{movie_id}** - Retrieve detailed information about a specific movie including title, overview, release date, runtime, genres, and ratings
- **GET /movie/popular** - Get a list of currently popular movies
- **GET /movie/top_rated** - Fetch the highest-rated movies
- **GET /movie/upcoming** - Access upcoming movie releases
- **GET /movie/now_playing** - Get movies currently in theaters

### TV Shows
- **GET /tv/{tv_id}** - Get detailed information about a specific TV show
- **GET /tv/popular** - Retrieve popular TV shows
- **GET /tv/top_rated** - Access top-rated TV series
- **GET /tv/on_the_air** - Get TV shows currently airing

### Search
- **GET /search/movie** - Search for movies by title or keywords
- **GET /search/tv** - Search for TV shows
- **GET /search/person** - Search for actors, directors, and crew members
- **GET /search/multi** - Perform a multi-search across movies, TV shows, and people

### People
- **GET /person/{person_id}** - Get detailed information about actors, directors, and crew
- **GET /person/popular** - Retrieve popular people in the entertainment industry

### Discover
- **GET /discover/movie** - Discover movies with advanced filtering options
- **GET /discover/tv** - Discover TV shows with custom filters

### Configuration
- **GET /configuration** - Get API configuration including image base URLs and available sizes

## Request and Response Format

### Request Structure

All API requests are made using HTTPS to the base URL: `https://api.themoviedb.org/3/`

**Example Request:**
```
GET https://api.themoviedb.org/3/movie/550?api_key=YOUR_API_KEY&language=en-US
```

**Query Parameters:**
- `api_key` (required) - Your unique API key for authentication
- `language` (optional) - ISO 639-1 language code for localized content (e.g., en-US, fr-FR)
- `page` (optional) - Page number for paginated results (default: 1)
- `region` (optional) - ISO 3166-1 country code for region-specific results

### Response Structure

The API returns responses in JSON format with a consistent structure.

**Example Response (Movie Details):**
```json
{
  "adult": false,
  "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "http://www.foxmovies.com/movies/fight-club",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
  "popularity": 61.416,
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "production_companies": [
    {
      "id": 508,
      "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      "name": "Regency Enterprises",
      "origin_country": "US"
    }
  ],
  "release_date": "1999-10-15",
  "revenue": 100853753,
  "runtime": 139,
  "status": "Released",
  "tagline": "Mischief. Mayhem. Soap.",
  "title": "Fight Club",
  "vote_average": 8.433,
  "vote_count": 26280
}
```

**Paginated Response Example:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "overview": "Movie description..."
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

## Authentication

### API Key Authentication

TMDB API uses API key-based authentication. You must include your API key with every request.

**How to Get an API Key:**
1. Create a free account at [themoviedb.org](https://www.themoviedb.org)
2. Navigate to your account settings
3. Click on the "API" link in the left sidebar
4. Request an API key and agree to the terms of use
5. Choose the type of API key (most users select "Developer")
6. Fill out the application form with your project details

**Authentication Methods:**

**Method 1: Query Parameter (v3 API)**
```
GET https://api.themoviedb.org/3/movie/550?api_key=YOUR_API_KEY
```

**Method 2: Bearer Token (v4 API - Recommended)**
```
GET https://api.themoviedb.org/3/movie/550
Headers:
  Authorization: Bearer YOUR_ACCESS_TOKEN
  Content-Type: application/json;charset=utf-8
```

**Important Notes:**
- Keep your API key secure and never expose it in client-side code
- Use environment variables to store your API key
- The Bearer token method is more secure and recommended for production applications
- API keys are tied to your account and should not be shared

## Error Handling

### Common HTTP Status Codes

- **200 OK** - Request succeeded
- **401 Unauthorized** - Invalid or missing API key
- **404 Not Found** - Resource does not exist
- **429 Too Many Requests** - Rate limit exceeded
- **500 Internal Server Error** - Server-side error
- **503 Service Unavailable** - API is temporarily unavailable

### Error Response Format

When an error occurs, the API returns a JSON object with error details:

```json
{
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false
}
```

### Common Error Codes

- **Code 7** - Invalid API key
- **Code 34** - Resource not found
- **Code 25** - Invalid request - check your parameters

### Handling Errors in Your Code

**Best Practices:**

1. **Always check the HTTP status code** before processing the response
2. **Implement retry logic** with exponential backoff for 429 and 5xx errors
3. **Validate user input** before making API calls to prevent 400 errors
4. **Cache responses** to reduce API calls and avoid rate limits
5. **Log errors** with sufficient context for debugging

**Example Error Handling (JavaScript):**
```javascript
try {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your credentials.');
    } else if (response.status === 404) {
      throw new Error('Movie not found.');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait before retrying.');
    } else {
      throw new Error(`API error: ${response.status}`);
    }
  }

  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error fetching movie data:', error);
  // Implement appropriate error handling (show user message, retry, etc.)
}
```

## Usage Limits and Best Practices

### Rate Limiting

The TMDB API enforces rate limits to ensure fair usage and maintain service quality:

- **Rate Limit:** 40 requests per 10 seconds per IP address
- **Exceeding the limit** results in HTTP 429 (Too Many Requests) responses
- **Retry-After header** is included in 429 responses indicating when to retry

### Best Practices

**1. Implement Caching**
- Cache API responses locally to reduce redundant requests
- Use appropriate cache expiration times (e.g., 24 hours for movie details)
- Update cached data periodically for time-sensitive information like trending movies

**2. Use Efficient Queries**
- Request only the data you need using the `append_to_response` parameter to combine multiple requests
- Use pagination parameters wisely to avoid fetching unnecessary data
- Filter and sort data server-side rather than fetching everything

**3. Respect Rate Limits**
- Implement rate limiting in your application to stay within API limits
- Use exponential backoff when retrying failed requests
- Distribute requests evenly rather than making burst requests

**4. Optimize Image Loading**
- Use the `/configuration` endpoint to get available image sizes
- Request appropriate image sizes for your use case (thumbnails vs. full-size)
- Implement lazy loading for images to improve performance

**5. Handle Errors Gracefully**
- Always implement proper error handling
- Provide meaningful error messages to users
- Log errors for monitoring and debugging

**6. API Key Security**
- Never expose your API key in client-side code or public repositories
- Use environment variables or secure configuration management
- Consider using a backend proxy to make API calls server-side

**7. Attribution Requirements**
- Provide proper attribution to TMDB in your application
- Display the TMDB logo where appropriate
- Follow the [TMDB API terms of use](https://www.themoviedb.org/documentation/api/terms-of-use)

**8. Monitor Your Usage**
- Track your API usage to stay within limits
- Set up alerts for approaching rate limits
- Review API access logs regularly

### Additional Resources

- **API Support Forum:** [TMDB Community](https://www.themoviedb.org/talk/category/5047958519c29526b50017d6)
- **Official Documentation:** [developer.themoviedb.org](https://developer.themoviedb.org/docs)
- **API Reference:** [API Methods Reference](https://developer.themoviedb.org/reference)
- **Status Page:** [status.themoviedb.org](https://status.themoviedb.org/)

---

**Note:** This documentation is based on TMDB API v3. Always refer to the official documentation for the most up-to-date information and additional endpoints.
