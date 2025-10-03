
-- CREATE TABLE userInfo (
--     id SERIAL PRIMARY KEY,
--     userId INT NOT NULL,
--     favorite JSONB,
--     phone VARCHAR(20),
--     age INT,
--     createdAt TIMESTAMP DEFAULT NOW(),
--     updatedAt TIMESTAMP DEFAULT NOW(),
--     CONSTRAINT fk_user
--         FOREIGN KEY(userId) 
--         REFERENCES users(id)
--         ON DELETE CASCADE
-- );



CREATE TABLE userInfo (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    phone VARCHAR(11) CHECK (char_length(phone) = 11),
    age INT,
    bio TEXT,
    social JSONB DEFAULT '[]'::JSONB,
    -- مثال محتوا: [{"name": "LinkedIn", "url": "https://linkedin.com/..."}]
    skills JSONB DEFAULT '[]'::JSONB,
    learning_skills JSONB DEFAULT '[]'::JSONB,
    resume JSONB DEFAULT '{}'::JSONB,
    -- مثال محتوا: {"file": "resume.pdf", "link": "https://linkedin.com/..."}
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

