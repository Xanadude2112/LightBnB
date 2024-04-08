INSERT INTO users (name, email, password) VALUES ('mike', 'jo@mama.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('riccardo', 'seb@lvs.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('miguel', 'laspalabras@iberico.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'flashy title', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 300, 3, 5, 6, 'Canada', 'petit bonheur', 'St Donat', 'Quebec', 'L4Y 1H5', TRUE);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (2, 'flashy title', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 300, 3, 5, 6, 'Canada', 'petit bonheur', 'St Donat', 'Quebec', 'L4Y 1H5', TRUE);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (3, 'flashy title', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 300, 3, 5, 6, 'Canada', 'petit bonheur', 'St Donat', 'Quebec', 'L4Y 1H5', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-09-11', '2024-10-14', 2, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2016-03-09', '2021-01-18', 2, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-10-06', '2023-03-04', 1, 3);

INSERT INTO property_reviews (guest_id, property_id, rating, message) VALUES (3, 2, 5, 'messages');
INSERT INTO property_reviews (guest_id, property_id, rating, message) VALUES (2, 2, 1, 'messages');
INSERT INTO property_reviews (guest_id, property_id, rating, message) VALUES (3, 1, 3, 'messages');