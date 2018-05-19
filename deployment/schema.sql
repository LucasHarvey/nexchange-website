use nexchange-website;

-- DROP EVERYTHING
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS messages;
SET FOREIGN_KEY_CHECKS = 1;

-- Create the tables
CREATE TABLE messages (
    id CHAR(36) NOT NULL,
    first_name NVARCHAR(40) NOT NULL,
    last_name NVARCHAR(60) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message VARCHAR(500) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);
