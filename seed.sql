INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(32, 'Fresh Air', 'The air is very clean!', CURRENT_TIMESTAMP);

INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(421, 'Low Pollution', 'Close windows & turn on air-purifier now!', CURRENT_TIMESTAMP);

INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(111, 'Normal Indoor Air', 'Turn on air-purifier', CURRENT_TIMESTAMP);

INSERT INTO air_levels (sensor_level, status,description, recorded_at)
VALUES(554, 'High Pollution - Action Recommended', 'Are the windows closed?', CURRENT_TIMESTAMP);

INSERT INTO room_states (state, activated_at, activation)
VALUES('Air Con On', CURRENT_TIMESTAMP, true);