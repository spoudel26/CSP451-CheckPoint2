const express = require("express");
const path = require("path");

const { router: apiRouter } = require("./routes/api");
const { router: viewRouter } = require("./routes/views");

const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/", viewRouter);
app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler (keep simple for learning)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// ================================
// Login Validation Feature
// ================================

// Sample users
const users = [
    { username: "alice", password: "12345" },
    { username: "bob", password: "abcde" }
];

// Function to validate login input
function validateLogin(username, password) {
    if (!username || !password) {
        console.log("Error: Username and password required");
        return false;
    }
    return true;
}

// Function to check credentials
function authenticate(username, password) {
    for (let user of users) {
        if (user.username === username && user.password === password) {
            console.log(`Success: Welcome ${username}!`);
            return true;
        }
    }
    console.log("Error: Invalid username or password");
    return false;
}

// Simulate login form submission
function loginFormSubmit(username, password) {
    console.log("Submitting login form...");
    if (validateLogin(username, password)) {
        authenticate(username, password);
    }
}

// Helper functions
function resetForm() {
    console.log("Login form reset!");
}

function displayWelcomeMessage(username) {
    console.log(`Welcome, ${username}, to the app!`);
}

// ================================
// Test the login feature
// ================================
loginFormSubmit("", "");              // Missing username & password
loginFormSubmit("alice", "");         // Missing password
loginFormSubmit("alice", "12345");    // Correct credentials
loginFormSubmit("bob", "wrongpass");  // Wrong password
loginFormSubmit("charlie", "123");    // Non-existing user
resetForm();
displayWelcomeMessage("Alice");
