CREATE TYPE NotifType AS ENUM ('Super', 'Normal', 'System');

CREATE TABLE notifications (
    notif_id SERIAL PRIMARY KEY,
    sender INT NOT NULL REFERENCES users(id),
    receiver INT NOT NULL REFERENCES users(id),
    type NotifType NOT NULL,
    is_none_reply BOOLEAN DEFAULT true,
    is_removed BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    message TEXT,
    replay TEXT
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON notifications
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- INSERT INTO notifications (sender, receiver, type, is_none_reply, is_removed, create_at , update_at , message , replay)
-- VALUES
-- (7, 11, 'Normal', TRUE, FALSE, NOW() , NOW() ,  'something asdsada ad ad ad aad' , NULL);



-- UPDATE notifications SET message='SAdSAdAsdADSAD a sad ad adad' WHERE notif_id = 1 ;