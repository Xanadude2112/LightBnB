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
  //Setup an array to hold any parameters that may be available for the query
  const queryParams = [];
  // Start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `; //WHERE 1=1 is meant to give SQL a dummy true so that it can carry on with the AND WHERE's in the conditionals

  // Check if a city has been passed in as an option, add the city to the params array and create a WHERE clause for the city
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  } 
  
  if (options.owner_id){
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  } 
  
  if (options.minimum_price_per_night){
    queryParams.push(parseInt(options.minimum_price_per_night, 10) * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night){
    queryParams.push(parseInt(options.maximum_price_per_night, 10) * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

queryString += `GROUP BY properties.id\n`;

  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating, 10));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  //Add any query that comes after the WHERE clause
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);

  // Run the query
  return pool.query(queryString, queryParams)
  .then((res) => res.rows)
  .catch((err) => {
      console.log(err.stack );
  });
  };

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const { owner_id, title, description, thumbnail_photo_url, cover_photo_url
    , cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country,
  street, city, province, post_code, active } = property;
  return pool
  .query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url
    , cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country,
  street, city, province, post_code, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING*; 
  `, // RETURNING *; will return the added user, including the auto-generated id
[owner_id, title, description, thumbnail_photo_url, cover_photo_url
  , cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country,
street, city, province, post_code, active])
.then((result) => {
  console.log(result.rows);
  return result.rows;
})
.catch((err) => {
  console.log(err.message);
});
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
