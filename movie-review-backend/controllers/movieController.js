const Movie = require('../models/Movie');
const Review = require('../models/Review');

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
};

// Get movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie' });
    }
};

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
        const { title, description, genre, releaseYear, director, cast, synopsis, posterUrl } = req.body;
        const movie = new Movie({ 
            title, 
            description, 
            genre, 
            releaseYear, 
            director, 
            cast, 
            synopsis, 
            posterUrl 
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create movie' });
    }
};

// Add a review to a movie
exports.addReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const movieId = req.params.id;
        const userId = req.user._id; // comes from authMiddleware

        const review = new Review({ userId, movieId, rating, reviewText });
        await review.save();

        // Update movie's average rating
        const reviews = await Review.find({ movieId });
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        
        await Movie.findByIdAndUpdate(movieId, { averageRating: avgRating });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review' });
    }
};

// Get reviews for a movie
exports.getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
};