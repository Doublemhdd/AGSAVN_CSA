-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS django_db;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'django_user'@'%' IDENTIFIED BY 'django_password';

-- Grant privileges to user
GRANT ALL PRIVILEGES ON django_db.* TO 'django_user'@'%';

-- Make privileges effective
FLUSH PRIVILEGES;

-- Use database
USE django_db; 