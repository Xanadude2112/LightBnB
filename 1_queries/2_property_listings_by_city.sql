--Show specific details about properties located in Vancouver including their average rating
SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM properties
LEFT JOIN property_reviews ON property_id = properties.id --left join used to get ALL available houses for the search even if they dont have ratings
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
