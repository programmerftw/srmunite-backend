// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Set up port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://coolub2001:iFcKhfrw7CQ1DFmp@srmunite.fagkblk.mongodb.net/?retryWrites=true&w=majority&appName=srmunite', {
    
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Define a sample schema and model (optional)
const newsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Auto-generated unique ID
    news: String,
    tags: String,
    description: String,
    date: {
        type: Date,
        default: Date.now // Set default value to current date and time
    },
    image: String
    // other fields...
});

const NewsModel = mongoose.model('News', newsSchema);

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example route to fetch data from MongoDB
app.get('/api/news', (req, res) => {
    NewsModel.find()
        .then(news => {
            res.json(news);
        })
        .catch(err => {
            console.error('Error fetching samples:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
// Define a route for creating a new news article
app.post('/api/news', (req, res) => {
    // Create a new News instance using the request body
    const newNews = new NewsModel({
        _id: new mongoose.Types.ObjectId(),
        news: req.body.news,
        tags: req.body.tags,
        description: req.body.description,
        image: req.body.image
        // You can add more fields here if needed
    });

    // Save the new news article to the database
    newNews.save()
        .then(() => {
            res.status(201).json({ message: 'News created successfully' });
        })
        .catch(err => {
            console.error('Error creating news:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/api/news/:id', async (req, res) => {
    const newsId = req.params.id;

    NewsModel.findById(newsId)
    .then(news => {
        res.json(news);
    })
    .catch(err => {
        console.error('Error fetching samples:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Define a route for deleting an existing news article
app.delete('/api/news/:id', (req, res) => {
    const newsId = req.params.id;
    
    // Find the news article by its ID and delete it
    NewsModel.findByIdAndDelete(newsId)
    .then(() => {
        res.json({ message: 'News deleted successfully' });
    })
    .catch(err => {
        console.error('Error deleting news:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Define a route for updating an existing news article
app.put('/api/news/:id', (req, res) => {
    const newsId = req.params.id;
    
    // Find the news article by its ID and update its fields
    NewsModel.findByIdAndUpdate(newsId, { 
        news: req.body.news,
        tags: req.body.tags,
        description: req.body.description,
        image: req.body.image
        // Update other fields as needed
    })
    .then(() => {
        res.json({ message: 'News updated successfully' });
    })
    .catch(err => {
        console.error('Error updating news:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Define a sample schema and model (optional)
const LostandFoundSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Auto-generated unique ID
    location: String,
    item: String,
    contact: Number,
    date: {
        type: Date,
        default: Date.now // Set default value to current date and time
    },
    image: String
    // other fields...
});

const LostandFoundModel = mongoose.model('LostandFound', LostandFoundSchema);


// Example route to fetch data from MongoDB
app.get('/api/lostandfound', (req, res) => {
    LostandFoundModel.find()
        .then(LostandFound => {
            res.json(LostandFound);
        })
        .catch(err => {
            console.error('Error fetching samples:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
// Define a route for creating a new news article
app.post('/api/lostandfound', (req, res) => {
    // Create a new News instance using the request body
    const newLostandFound = new LostandFoundModel({
        _id: new mongoose.Types.ObjectId(),
        location: req.body.location,
        item: req.body.item,
        contact: req.body.contact,
        image: req.body.image,
        // You can add more fields here if needed
    });

    // Save the new news article to the database
    newLostandFound.save()
        .then(() => {
            res.status(201).json({ message: 'Lost and Found created successfully' });
        })
        .catch(err => {
            console.error('Error creating Lost and Found:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/api/lostandfound/:id', async (req, res) => {
    const LostandFoundId = req.params.id;

    LostandFoundModel.findById(LostandFoundIdId)
    .then(LostandFound => {
        res.json(LostandFound);
    })
    .catch(err => {
        console.error('Error fetching samples:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Define a route for deleting an existing news article
app.delete('/api/lostandfound/:id', (req, res) => {
    const LostandFoundId = req.params.id;
    
    // Find the news article by its ID and delete it
    LostandFoundModel.findByIdAndDelete(LostandFoundId)
    .then(() => {
        res.json({ message: 'Lost and Found deleted successfully' });
    })
    .catch(err => {
        console.error('Error deleting Lost and Found:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Define a route for updating an existing Lost and Found article
app.put('/api/lostandfound/:id', (req, res) => {
    const LostandFoundId = req.params.id;
    
    // Find the news article by its ID and update its fields
    LostandFoundModel.findByIdAndUpdate(LostandFoundId, { 
        location: req.body.location,
        item: req.body.item,
        contact: req.body.contact,
        image: req.body.image
        // Update other fields as needed
    })
    .then(() => {
        res.json({ message: 'lost and found updated successfully' });
    })
    .catch(err => {
        console.error('Error updating lost and found:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

