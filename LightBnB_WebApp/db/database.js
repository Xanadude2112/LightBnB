const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

// the following assumes that you named your connection variable `pool`
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {response}).catch(error => {console.log('error:', error.stack)});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool 
  .query(
    `SELECT *
     FROM users
     WHERE LOWER(email) = LOWER($1)
    `,
    [email]
  )
  .then((result) => {
    if (result.rows.length) {
      return result.rows[0]; // Return the first user that matches the email
    } else {
      return null;
    }
  })
  .catch((err) => {
console.error(err.stack);
  })
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool 
  .query(
    `SELECT *
     FROM users
     WHERE id = $1
    `,
    [id]
  )
  .then((result) => {
    if (result.rows.length) {
      return result.rows[0]; // Return the first user that matches the id
    } else {
      return null;
    }
  })
  .catch((err) => {
console.error(err.stack);
  })
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { name, email, password } = user;
  return pool
  .query(`
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING*; 
  `, // RETURNING *; will return the added user, including the auto-generated id
[name, email, password])
.then((result) => {
  console.log(result.rows);
  return result.rows;
})
.catch((err) => {
  console.log(err.message);
});
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
  .query(`
   SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
   FROM reservations
   JOIN properties ON reservations.property_id = properties.id
   JOIN property_reviews ON properties.id = property_reviews.property_id
   WHERE reservations.guest_id = $1
   GROUP BY properties.id, reservations.id
   ORDER BY reservations.start_date
   LIMIT $2
  `,
  [guest_id, limit])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  return pool // be sure to return the entire query itself not just the resolve. WHY?
  // When getAllProperties is called in the apiRoutes.js file, it is chained to .then, which can only consume a promise.
    .query(
      `SELECT *
       FROM properties
       LIMIT $1`,
      [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
