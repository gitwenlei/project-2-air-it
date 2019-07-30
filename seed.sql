INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(32, 'Fresh Air', 'The air is very clean!', CURRENT_TIMESTAMP);

INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(421, 'Low Pollution', 'Very bad turn on air-purifier now!', CURRENT_TIMESTAMP);

INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(111, 'Normal Indoor Air', 'Turn on air-con', CURRENT_TIMESTAMP);

INSERT INTO room_states (state, activated_at, activation)
VALUES('Air Con On', CURRENT_TIMESTAMP, true);