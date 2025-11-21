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



ALTER TABLE notifications ADD COLUMN is_Seen BOOLEAN DEFAULT false 


ALTER TABLE notifications DROP COLUMN is_removed 






INSERT INTO notifications (
    sender, receiver, type, is_none_reply, is_removed, is_Seen, create_at, update_at, message, replay
)
VALUES
(7, 11, 'Normal', true, false, false, NOW(), NOW(), 'Test notification 1', ''),
(11, 7, 'Super', true, false, false, NOW(), NOW(), 'Test notification 2', ''),
(10000, 11, 'System', true, false, false, NOW(), NOW(), 'Test notification 3', ''),
(7, 10000, 'Normal', true, false, false, NOW(), NOW(), 'Test notification 4', ''),
(11, 10000, 'Super', true, false, false, NOW(), NOW(), 'Test notification 5', ''),
(3, 5, 'Normal', true, false, false, NOW(), NOW(), 'Test notification 6', ''),
(12, 2, 'System', true, false, false, NOW(), NOW(), 'Test notification 7', ''),
(3, 7, 'Super', true, false, false, NOW(), NOW(), 'Test notification 8', ''),
(11, 12, 'Normal', true, false, false, NOW(), NOW(), 'Test notification 9', ''),
(7, 5, 'System', true, false, false, NOW(), NOW(), 'Test notification 10', '');







INSERT INTO notifications (
    sender, receiver, type, is_none_reply, is_Seen, create_at, update_at, message, replay
)
VALUES
(11, 7, 'Normal', true, false, NOW(), NOW(), 'Test notification 7777', '')

-- UPDATE notifications SET message='SAdSAdAsdADSAD a sad ad adad' WHERE notif_id = 1 ;