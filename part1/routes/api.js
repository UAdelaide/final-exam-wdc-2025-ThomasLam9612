const db = require("mysql2/promise");
db.createPool({
    host:localhost,
    user:root,
    password:root,
    database:DogWalkService

});

const SELECT_APPLICATION_FORM =
  "SELECT * FROM applicationforms WHERE petId =? and userId =?";
router.get('/', function(req, res, next) {

});