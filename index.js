const express = require("express");
const Logger = require("./utils/Logger");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");

require("dotenv").config();

// ✅ Apply CORS early
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // optional: only if you're using cookies
  })
);

// Other middleware
app.use(express.json());
app.use(cookieParser());

// Connect to DB
connectDB();

const PORT = process.env.PORT || 5000;

// ✅ Apply routes after CORS
app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
  Logger.debug("Server is running on port");
});

app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`);
});
