const db = require("mysql2/promise");
const pool = db.createPool({
    host: 127.0.0.,
    user: root,
    password: root,
    database: DogWalkService

});

/**
 *     "dog_name": "Max",
    "size": "medium",
    "owner_username": "alice123"
  },
 */
const SELECT_Dog_Info = "SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username  FROM Dogs Left Join Users ON owner_id = Users.user_id";
router.get('/dogs', function(req, res, next) {
    const [rows] = pool.query(SELECT_Dog_Info);
    return res.send(rows);
});

module.exports = router;