const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("release")); // Serve frontend files from 'release' folder


//from here you write your API code for your application


// Sample API Endpoint
app.get("/api/data", (req, res) => {
    res.json({ message: "Hello, API!" });
});

// Example POST endpoint to handle JSON data
app.post("/api/submit", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    res.json({ success: true, message: `Received data for ${name}` });
});



//at the end of the API definition, you can run the server

// 3️⃣ Handle All Other Routes (For Single Page Apps)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../release/index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
