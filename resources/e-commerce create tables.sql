CREATE TABLE [users] (
    userid INT IDENTITY(1,1) PRIMARY KEY,
    cccd VARCHAR(12) UNIQUE,
    username NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    dateofbirth DATE,
    fullname NVARCHAR(100) NOT NULL,
    phonenumber VARCHAR(16),
    CONSTRAINT CK_CCCD CHECK (LEN(cccd) = 12), 
    CONSTRAINT CK_phonenumber CHECK (LEN(phonenumber) >= 10),
    -- image NVARCHAR(255),
    refresh_token VARCHAR(255) NULL
);
CREATE TABLE [store] (
    StoreID INT IDENTITY(1,1) PRIMARY KEY,
    PolicyInfor VARCHAR(MAX),
    Introduction VARCHAR(MAX),
    QuanitySold INT DEFAULT 0,
    QuantityOfGoods INT DEFAULT 0,
    ST_UserID INT UNIQUE,
    CONSTRAINT CK_Store_User FOREIGN KEY (ST_UserID) REFERENCES [users](UserID)
    ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Category (
    categoryid INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    -- Cate_Descr NVARCHAR(MAX),
    Image NVARCHAR(MAX) 
);

-- CREATE TABLE Products (
--     ProductID INT IDENTITY(1,1) PRIMARY KEY,
--     PName NVARCHAR(100) NOT NULL,
--     SellPrice INT NOT NULL,
--     Pr_Descr NVARCHAR(MAX),
--     Amount INT DEFAULT 0,
--     TimeUpload DATETIME NOT NULL,
--     ImagePd NVARCHAR(MAX), 
--     Attribute NVARCHAR(MAX), 
--     StatusPro NVARCHAR(10) CHECK (StatusPro IN ('ForSale', 'Sold', 'Deleted')) NOT NULL,
--     SellerID INT NOT NULL,
--     PC_ID INT,
--     FOREIGN KEY (SellerID) REFERENCES [users](UserID) ON DELETE NO ACTION ON UPDATE CASCADE,
--     FOREIGN KEY (PC_ID) REFERENCES Category(CategoryID) ON DELETE NO ACTION ON UPDATE CASCADE
-- );

CREATE TABLE [products] (
    productid INT IDENTITY(1,1) PRIMARY KEY,
    categoryid INT NOT NULL,
    username INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(255),
    price INT NOT NULL,
    location NVARCHAR(255) NOT NULL,
    remaining_amount INT DEFAULT 0,
    approved NVARCHAR(255) CHECK (approved IN ('accepted', 'pending', 'rejected')) NOT NULL,
    discount INT DEFAULT 0,
    image NVARCHAR(255),
    FOREIGN KEY (categoryid) REFERENCES [Category](categoryid) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES [users](username) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Review (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    ReviewStoreID INT NOT NULL,
    ReviewUserID INT NOT NULL,
    Content NVARCHAR(MAX),
    CommentDate DATETIME NOT NULL,
    Rating INT CHECK (Rating >= 0 AND Rating <= 5),
    FOREIGN KEY (ReviewStoreID) REFERENCES Store(StoreID)
	ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (ReviewUserID) REFERENCES [users](UserID)
	ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE Conservation (
    Cons_ID INT IDENTITY(1,1) PRIMARY KEY,
    Date_Start DATETIME NOT NULL,
    Title NVARCHAR(255)
);

CREATE TABLE Join_Conservation (
    Conser_ID INT NOT NULL,
    JoinID INT NOT NULL,
    Con_Status NVARCHAR(10) CHECK (Con_Status IN ('Seen', 'NotSeen')),
    PRIMARY KEY (Conser_ID, JoinID),
    FOREIGN KEY (Conser_ID) REFERENCES Conservation(Cons_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (JoinID) REFERENCES [users](UserID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Message (
    Mess_ID INT IDENTITY(1,1) PRIMARY KEY,
    Date_Send DATETIME NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    SenderID INT NOT NULL,
    Mes_ConID INT NOT NULL,
    FOREIGN KEY (SenderID) REFERENCES [users](UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Mes_ConID) REFERENCES Conservation(Cons_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Article (
    ArticleID INT IDENTITY(1,1) PRIMARY KEY,
    ArticleStoreId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX),
    ImageAr NVARCHAR(MAX),
    created_at DATETIME,
    LikeAr INT DEFAULT 0,
    FOREIGN KEY (ArticleStoreId) REFERENCES Store(StoreID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Admin (
    username NVARCHAR(255) PRIMARY KEY,
    password NVARCHAR(100) NOT NULL,
    refresh_token NVARCHAR(255) NULL
);


CREATE TABLE Messages (
    Mess_ID INT IDENTITY(1,1) PRIMARY KEY,
    Date_Send DATETIME NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    SenderID INT NULL,
    ReceiverID INT NULL,
    FOREIGN KEY (SenderID) REFERENCES [users](UserID),
    FOREIGN KEY (ReceiverID) REFERENCES [users](UserID)
);
