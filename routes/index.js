const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// returns error message when navigating to unknown destination
router.use((req, res) => {
    res.status(404).send('404 Error!');
});


module.exports = router;