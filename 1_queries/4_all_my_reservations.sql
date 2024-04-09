--Show all reservations for a user
SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, AVG(rating) AS average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id --using the properties.id to plug the property_reviews.property_id
WHERE reservations.guest_id = 4 --specifies which user is being targeted for this select (user with an id of 4)
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;