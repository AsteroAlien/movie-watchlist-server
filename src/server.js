import express from 'express';
import {config} from 'dotenv';
import {connectDB, disconnectDB} from './config/db.js';

//import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
 
config();
connectDB();

const app = express();

// middleware parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// home route
app.get('/', (req, res) => {
    res.status(200).json({message: "This is the home route"});
});

// API routes
app.use("/home", homeRoutes)
app.use("/auth", authRoutes);
app.use("/users", userRoutes)
app.use("/movies", movieRoutes)
app.use("/watchlist", watchlistRoutes)

const PORT = process.env.PORT || 5003;
const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

//Handle unhandled promise rejections (e.g. database connection errors);
process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection: ", error);
    server.close(async()=> {
        await disconnectDB();
        process.exit(1);
    });
});

//Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception: ", error);
    await disconnectDB();
    process.exit(1);
});

//Clean shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down.");
    server.close(async()=> {
        await disconnectDB();
        process.exit(0);
    });
});
