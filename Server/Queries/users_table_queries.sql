CREATE TYPE user_type AS ENUM ('ADMIN', 'PRO', 'NORMAL');

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

-- ⚙️ تابع جدید برای کنترل updateAt
CREATE OR REPLACE FUNCTION update_updateAt_column()
RETURNS TRIGGER AS $$
BEGIN
  -- فقط زمانی updateAt رو تغییر بده که فیلدهای مهم تغییر کرده باشند
  IF (
    OLD."userName" IS DISTINCT FROM NEW."userName"
    OR OLD."email" IS DISTINCT FROM NEW."email"
    OR OLD."type" IS DISTINCT FROM NEW."type"
    OR OLD."passCode" IS DISTINCT FROM NEW."passCode"
    OR OLD."profileImageUrl" IS DISTINCT FROM NEW."profileImageUrl"
    OR OLD."lastLogin" IS DISTINCT FROM NEW."lastLogin"
  ) THEN
    NEW."updateAt" = NOW();
  ELSE
    NEW."updateAt" = OLD."updateAt";
  END IF;

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

ALTER TABLE users ADD COLUMN isActive BOOLEAN DEFAULT true;

ALTER TABLE users DROP COLUMN isActive;

ALTER TABLE users ADD COLUMN RefreshToke TEXT;

ALTER TABLE users ADD COLUMN inspection INTEGER DEFAULT 0;

-- INSERT INTO users ("userName", "email", "type", "passCode", "profileImageUrl", "lastLogin")
-- VALUES
-- ('Aliiiii', 'Ali11232@gmail.com', 'NORMAL', 'Armin@123456', Null, NOW());
