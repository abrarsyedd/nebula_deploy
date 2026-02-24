-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nebuladb;
USE nebuladb;

-- Create the system_status table
CREATE TABLE IF NOT EXISTS system_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert mock data
INSERT INTO system_status (service_name, status) VALUES 
('Frontend UI Engine', 'Operational'),
('Backend API Service', 'Operational'),
('MySQL Database', 'Healthy'),
('Jenkins CI/CD Pipeline', 'Awaiting Triggers');