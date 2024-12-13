CREATE TRIGGER trg_Review_Delete
ON Store
AFTER DELETE
AS
BEGIN
    DELETE FROM Review WHERE ReviewStoreID IN (SELECT StoreID FROM DELETED);
END;
-------------------------------------------------------------------------------
CREATE TRIGGER trg_Review_User_Delete
ON [User]
AFTER DELETE
AS
BEGIN
    DELETE FROM Review WHERE ReviewUserID IN (SELECT UserID FROM DELETED);
END;
-------------------------------------------------------------------------------
CREATE TRIGGER trg_DeleteUser ON [users]
AFTER DELETE
AS
BEGIN
    UPDATE Messages
    SET SenderID = NULL
    WHERE SenderID IN (SELECT UserID FROM deleted);

    UPDATE Messages
    SET ReceiverID = NULL
    WHERE ReceiverID IN (SELECT UserID FROM deleted);
END;
--------------------------------------------------------------------------------
CREATE TRIGGER trg_delete_user_messages
ON users
AFTER DELETE
AS
BEGIN
    DELETE FROM Message
    WHERE sender IN (SELECT username FROM DELETED)
       OR receiver IN (SELECT username FROM DELETED);
END;
