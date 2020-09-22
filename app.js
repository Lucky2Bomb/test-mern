const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();


app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

const PORT = config.get("port") || 3001;

async function start() {
    try {
        await mongoose.connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log(`Server started port: ${PORT}...`));
    } catch (error) {
        console.log(`SERVER ERROR: ${error.message}`);
        process.exit();
    }
}

start();
