

CREATE TABLE userInfo (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    phone VARCHAR(11) CHECK (char_length(phone) = 11),
    age INT,
    bio TEXT,
    social JSONB DEFAULT '[]'::JSONB,
    skills JSONB DEFAULT '[]'::JSONB,
    learning_skills JSONB DEFAULT '[]'::JSONB,
    resume JSONB DEFAULT '{}'::JSONB,
    favorite JSONB DEFAULT '{}'::JSONB,
    
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_user
        FOREIGN KEY(userId) 
        REFERENCES users(id)
        ON DELETE CASCADE
);


ALTER TABLE userInfo
ALTER COLUMN phone TYPE VARCHAR(13);


ALTER TABLE userInfo
DROP CONSTRAINT userinfo_phone_check;


ALTER TABLE userInfo
ALTER COLUMN age TYPE VARCHAR;


ALTER TABLE userInfo
RENAME COLUMN age TO DateOfBirth;

