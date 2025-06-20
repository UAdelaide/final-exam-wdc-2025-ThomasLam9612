const db = require("mysql2/promise");
db.createPool({
    host:localhost
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});