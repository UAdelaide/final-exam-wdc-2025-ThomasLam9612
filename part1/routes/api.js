req
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});