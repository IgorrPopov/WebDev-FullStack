CREATE DATABASE easy_chat;

CREATE TABLE users (
  user_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE messages (
  message_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  time TIMESTAMP NOT NULL,
  message TEXT NOT NULL
);

GRANT ALL ON easy_chat.* TO 'lord_of_the_chat'@'localhost' IDENTIFIED BY 'some_password';