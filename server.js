const express = require('express');
const app = express();

module.exports = app;

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
});