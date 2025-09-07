-- ایجاد enum برای UserType
CREATE TYPE user_type AS ENUM ('ADMIN', 'PRO', 'NORMAL');

-- ایجاد جدول users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "type" user_type NOT NULL,
    "passCode" VARCHAR(255) NOT NULL,
    "profileImageUrl" TEXT,
    "lastLogin" TIMESTAMP,
    "createAt" TIMESTAMP DEFAULT NOW(),
    "updateAt" TIMESTAMP DEFAULT NOW()
);

-- Trigger برای بروزرسانی خودکار updateAt
CREATE OR REPLACE FUNCTION update_updateAt_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updateAt" = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updateAt
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updateAt_column();

-- نمونه داده
INSERT INTO users ("userName", "email", "type", "passCode", "profileImageUrl", "lastLogin")
VALUES
('ehsan', 'ehsan.good1382@gmail.com', 'ADMIN', 'Armin@123456', Null, NOW()),
('sara', 'sara@example.com', 'NORMAL', 'abcdef', Null, NOW());
