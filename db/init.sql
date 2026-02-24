-- 1. Explicitly create and select the database
CREATE DATABASE IF NOT EXISTS nebuladb;
USE nebuladb;

-- 2. Drop the table if it somehow got stuck in a broken state
DROP TABLE IF EXISTS system_status;

-- 3. Create the table with expanded columns
CREATE TABLE system_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    health_score INT DEFAULT 100,
    environment VARCHAR(50) DEFAULT 'Production',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Insert multiple rows of realistic data
INSERT INTO system_status (service_name, status, health_score, environment) VALUES 
('Frontend UI Engine', 'Operational', 100, 'Production'),
('Backend API Service', 'Operational', 98, 'Production'),
('MySQL Database', 'Healthy', 100, 'Production'),
('Jenkins CI/CD Pipeline', 'Awaiting Triggers', 100, 'CI/CD'),
('Redis Cache Server', 'Operational', 95, 'Production'),
('Payment Gateway', 'Degraded', 75, 'Production'),
('User Auth Service', 'Operational', 99, 'Production');