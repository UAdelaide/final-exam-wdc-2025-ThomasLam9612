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
const openWalkRequests = `SELECT request_id, d.name AS dog_name, requested_time, duration_minutes,location,u.username AS owner_username FROM WalkRequests wr
LEFT JOIN Dogs d ON wr.dog_id = d.dog_id
LEFT JOIN Users u ON d.owner_id = u.user_id`;

// const summary = `SELECT
//   u.username AS walker_username,
//   COUNT(r.rating_id) AS total_ratings,
//   ROUND(AVG(r.rating), 1) AS average_rating,
//   (
//     SELECT COUNT(*)
//     FROM WalkRequests wr2
//     JOIN WalkApplications wa2 ON wr2.request_id = wa2.request_id
//     WHERE wa2.walker_id = u.user_id AND wr2.status = 'completed'

//   ) AS completed_walks
// FROM Users u
// LEFT JOIN WalkRatings r ON r.walker_id = u.user_id
// WHERE u.role = 'walker'
// GROUP BY u.user_id`;

const summary = `SELECT
  u.username AS walker_username,
  COUNT(r.rating_id) AS total_ratings,
  ROUND(AVG(r.rating), 1) AS average_rating,
  (
    SELECT COUNT(*)
    FROM WalkRequests wr2
    JOIN WalkApplications wa2 ON wr2.request_id = wa2.request_id
    WHERE wa2.walker_id = u.user_id AND u.username = 'bobwalker' AND wr2.status = 'completed'
  ) AS completed_walks
FROM Users u
LEFT JOIN WalkRatings r ON r.walker_id = u.user_id
WHERE u.role = 'walker'
GROUP BY u.user_id`;
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


/**
 * Return a summary of each walker with their average rating and number of completed walks. /api/walkers/summary
[
  {
    "walker_username": "bobwalker",
    "total_ratings": 2,
    "average_rating": 4.5,
    "completed_walks": 2
  },
  {
    "walker_username": "newwalker",
    "total_ratings": 0,
    "average_rating": null,
    "completed_walks": 0
  }
]
 */
router.get('/walkers/summary', async function(req, res, next) {
    console.log("!111");
    const [rows] = await pool.query(summary);
    return res.send(rows);
});
module.exports = router;
