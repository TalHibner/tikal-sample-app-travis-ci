const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json({
        meta: {
            status: true,
            message: "Docker rockss!!!",
            code: 200
        }
    });
});

app.listen(port, () => console.log(`Server is running successfully on port number ${port}`));

module.exports = app;