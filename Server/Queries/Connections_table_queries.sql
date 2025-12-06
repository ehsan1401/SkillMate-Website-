
CREATE TYPE ConnectionType AS ENUM ('sync' , 'invite' , 'request');
CREATE TYPE ConnectionStatus AS ENUM ('pending' , 'accepted' , 'rejected', 'cancelled');

CREATE TABLE Connections (
    id SERIAL PRIMARY KEY,
    "type" ConnectionType NOT NULL ,
    "senderId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "receiverId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "projectId" INT DEFAULT NULL ,
    "status" ConnectionStatus NOT NULL,
    "message" TEXT DEFAULT NULL,
    "seen" BOOLEAN DEFAULT false ,
    "respondedAt" TIMESTAMP DEFAULT NULL ,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION Update_updatedAt()
RETURNS TRIGGER AS $$
BEGIN 
    IF OLD.status IS DISTINCT FROM NEW.status
    OR OLD.message IS DISTINCT FROM NEW.message
    OR OLD.seen IS DISTINCT FROM NEW.seen THEN
        NEW."updatedAt" := NOW();
    END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql; 

CREATE TRIGGER Set_updatedAt
BEFORE UPDATE ON Connections
FOR EACH ROW
EXECUTE FUNCTION Update_updatedAt();

ALTER TABLE connections
ADD CONSTRAINT unique_sync UNIQUE ("senderId", "receiverId", "type");
