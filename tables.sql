CREATE TABLE IF NOT EXISTS air_levels (
  id SERIAL PRIMARY KEY,
  sensor_level INTEGER,
  status TEXT,
  description TEXT,
  recorded_at TIMESTAMP DEFAULT now()
);


CREATE TABLE IF NOT EXISTS room_states (
  id SERIAL PRIMARY KEY,
  state TEXT,
  activation BOOLEAN,
  activated_at TIMESTAMP DEFAULT now()
);


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  location_name TEXT
);

CREATE TABLE IF NOT EXISTS user_location (
  user_id INT,
  location_id INT
);