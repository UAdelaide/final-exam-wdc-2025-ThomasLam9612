const db = require("mysql2/promise");
db.createPool({
    
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});