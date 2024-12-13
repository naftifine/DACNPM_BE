CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cccd VARCHAR(12) UNIQUE,
    username NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    date_of_birth DATE,
    fullname NVARCHAR(100) NOT NULL,
    phone_number VARCHAR(16),
	refresh_token VARCHAR(255) NULL,
    CONSTRAINT CK_CCCD CHECK (LEN(CCCD) = 12), 
    CONSTRAINT CK_PhoneNumber CHECK (LEN(phone_number) >= 10),
);
CREATE TABLE Store (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255),
    location NVARCHAR(MAX),
    image NVARCHAR(MAX),
    introduction NVARCHAR(MAX),
    sold_amount INT DEFAULT 0,
    goods_amount INT DEFAULT 0,
    policy NVARCHAR(MAX),
    userID INT UNIQUE,
    FOREIGN KEY (userID) REFERENCES Users (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Category (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    image NVARCHAR(MAX) -- sql k có json
);

CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description NVARCHAR(MAX),
    remaining_amount INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
	approved VARCHAR(30) DEFAULT 'pending' CHECK( approved IN ('accepted', 'rejected', 'pending')),
    image NVARCHAR(MAX), 
    attribute NVARCHAR(MAX), 
    status NVARCHAR(10) DEFAULT 'ForSale' CHECK (status IN ('ForSale', 'Sold', 'Deleted')) NOT NULL,
    categoryID INT NOT NULL,
    userID INT,
    FOREIGN KEY (categoryID) REFERENCES Category (id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE Review (
    id INT IDENTITY(1,1) PRIMARY KEY,
    storeID INT NOT NULL,
    userID INT NOT NULL,
    content NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    rating INT CHECK (rating >= 0 AND rating <= 5),
    FOREIGN KEY (storeID) REFERENCES Store(ID)
	ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (userID) REFERENCES Users (ID)
	ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE Conservation (
    id INT IDENTITY(1,1) PRIMARY KEY,
    created_at DATETIME DEFAULT GETDATE(),
    title NVARCHAR(255)
);

CREATE TABLE Join_Conservation ( 
    Conser_ID INT NOT NULL,
    JoinID INT NOT NULL,
    Con_Status NVARCHAR(10) CHECK (Con_Status IN ('Seen', 'NotSeen')),
    PRIMARY KEY (Conser_ID, JoinID),
    FOREIGN KEY (Conser_ID) REFERENCES Conservation(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (JoinID) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Message (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date_send DATETIME DEFAULT GETDATE(),
    content NVARCHAR(MAX) NOT NULL,
    senderID INT NOT NULL,
    receiverID INT NOT NULL,
    conserID INT NOT NULL,
    FOREIGN KEY (senderID) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (receiverID) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (conserID) REFERENCES Conservation(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Article (
    id INT IDENTITY(1,1) PRIMARY KEY,
    storeId INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    content NVARCHAR(MAX),
    image NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    like_article INT DEFAULT 0,
    FOREIGN KEY (storeId) REFERENCES Store(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Admin (
    username NVARCHAR(255) PRIMARY KEY,
    password NVARCHAR(100) NOT NULL,
    refresh_token NVARCHAR(255) NULL
);


