const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// connects app to mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost: ${PORT}`));