var express = require('express');
var router = express.Router();
const db = require("mysql2/promise");
const pool = db.createPool({
    socketPath: '/var/run/mysqld/mysqld.sock',
    user: "root",
    password: "root",
    database: "DogWalkService"

});

/**
 *     "dog_name": "Max",
    "size": "medium",
    "owner_username": "alice123"
  },
 */
const SELECT_Dog_Info = "SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username  FROM Dogs Left Join Users ON owner_id = Users.user_id";
const openWalkRequests = ```SELECT * FROM WalkRequests wr
LEFT JOIN Dogs d ON wr.dog_id = d.dog_id
LEFF JOIN Users u ON d.owner_id = u.user_id```;
router.get('/dogs', async function(req, res, next) {
    console.log("!111");
    const [rows] = await pool.query(SELECT_Dog_Info);
    return res.send(rows);
});

/**
 * [
  {
    "request_id": 1,
    "dog_name": "Max",
    "requested_time": "2025-06-10T08:00:00.000Z",
    "duration_minutes": 30,
    "location": "Parklands",
    "owner_username": "alice123"
  }
]
 */

router.get('/walkrequests/open', async function(req, res, next) {
    console.log("!111");
    const [rows] = await pool.query(openWalkRequests);
    return res.send(rows);
});
module.exports = router;
