const db = require("mysql2/promise");
db.createPool({
    host:localhost,
    user:root,
    password:root,
    database:DogWalkService

});

/**
 *     "dog_name": "Max",
    "size": "medium",
    "owner_username": "alice123"
  },
 */
const SELECT_APPLICATION_FORM = "SELECT * FROM Dogs Left Join Users ON owner_id = Users.user_id;"
router.get('/', function(req, res, next) {

});