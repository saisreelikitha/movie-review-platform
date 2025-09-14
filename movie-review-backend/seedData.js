const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const sampleMovies = [
    {
        title: "The Shawshank Redemption",
        genre: ["Drama", "Crime"],
        releaseYear: 1994,
        director: "Frank Darabont",
        cast: ["Tim Robbins", "Morgan Freeman"],
        synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        averageRating: 4.8
    },
    {
        title: "The Godfather",
        genre: ["Crime", "Drama"],
        releaseYear: 1972,
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        averageRating: 4.7
    },
    {
        title: "The Dark Knight",
        genre: ["Action", "Crime", "Drama"],
        releaseYear: 2008,
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        averageRating: 4.6
    },
    {
        title: "Inception",
        genre: ["Action", "Sci-Fi", "Thriller"],
        releaseYear: 2010,
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
        synopsis: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO's mind.",
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        averageRating: 4.5
    },
    {
        title: "Pulp Fiction",
        genre: ["Crime", "Drama"],
        releaseYear: 1994,
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
        synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        posterUrl: "https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
        averageRating: 4.5
    }
];

const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        console.log('Connection string:', process.env.MONGO_URI);
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing movies
        const deletedCount = await Movie.deleteMany({});
        console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing movies`);

        // Insert sample movies
        const insertedMovies = await Movie.insertMany(sampleMovies);
        console.log('✅ Sample movies added successfully!');
        console.log(`📊 Added ${insertedMovies.length} movies to the database`);

        // Show the added movies
        insertedMovies.forEach((movie, index) => {
            console.log(`${index + 1}. ${movie.title} (${movie.releaseYear}) - ID: ${movie._id}`);
        });

        console.log('\n🎉 Database seeding completed!');
        console.log('Now you can test your API at: http://localhost:5000/api/movies');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

seedDatabase();