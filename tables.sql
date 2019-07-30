CREATE TABLE Levels (
  id SERIAL PRIMARY KEY,
  sensor_level INTEGER,
  message TEXT,
  captured_at TIMESTAMP
);


CREATE TABLE States (
  id SERIAL PRIMARY KEY,
  room_state TEXT,
  activated_at TIMESTAMP,
  activation BOOLEAN
);