INSERT INTO air_levels (sensor_level, status, description)
VALUES(32, 'Fresh Air', 'The air is very clean!');

INSERT INTO air_levels (sensor_level, status, description)
VALUES(421, 'Low Pollution', 'Close windows & turn on air-purifier now!');

INSERT INTO air_levels (sensor_level, status, description)
VALUES(111, 'Normal Indoor Air', 'Make sure air-purifier & air-con is on');

INSERT INTO air_levels (sensor_level, status, description)
VALUES(554, 'High Pollution - Action Recommended', 'Are the windows closed?');

INSERT INTO room_states (state, activation)
VALUES('Air Con On', true);

INSERT INTO room_states (state, activation)
VALUES('Air Con On', false);

INSERT INTO users (username, password)
VALUES ('susan', '1234');

INSERT INTO users (username, password)
VALUES ('peter', 'abcd');

INSERT INTO locations (location_name)
VALUES ('GA');

INSERT INTO locations (location_name)
VALUES ('HOME');


INSERT INTO user_location (user_id, location_id)
VALUES (1, 2);

INSERT INTO user_location (user_id, location_id)
VALUES (2, 1);