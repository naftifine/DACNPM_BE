CREATE TABLE [users] (
    userid INT IDENTITY(1,1) PRIMARY KEY,
    cccd VARCHAR(12) UNIQUE,
    username NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    dateofbirth DATE,
    fullname NVARCHAR(100) NOT NULL,
    phonenumber VARCHAR(16),
    refresh_token VARCHAR(255) NULL,
    CONSTRAINT CK_CCCD CHECK (LEN(cccd) = 12), 
    CONSTRAINT CK_phonenumber CHECK (LEN(phonenumber) >= 10)
    -- image NVARCHAR(255),
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
    categoryid INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    image NVARCHAR(MAX) 
);

CREATE TABLE [products] (
    productid INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description NVARCHAR(MAX),
    remaining_amount INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
	approved VARCHAR(30) DEFAULT 'pending' CHECK(approved IN ('accepted', 'rejected', 'pending')),
    image NVARCHAR(MAX), 
    attribute NVARCHAR(MAX), 
    status NVARCHAR(10) DEFAULT 'ForSale' CHECK (status IN ('ForSale', 'Sold', 'Deleted')) NOT NULL,
    categoryid INT NOT NULL,
    userID INT,
    FOREIGN KEY (categoryid) REFERENCES Category (categoryid) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (userID) REFERENCES [users](userid) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE [ Order ] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    productid INT NOT NULL,
    userid INT NOT NULL, 
    quantity INT NOT NULL, 
    totalprice INT NOT NULL CHECK (totalprice > 0),
    shippingfee INT NOT NULL,
    shippingAddress NVARCHAR(MAX),
    buyerNote NVARCHAR(MAX)
    FOREIGN KEY (productid) REFERENCES products (id) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE ON UPDATE CASCADE
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

CREATE TABLE Message (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date_send DATETIME NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    sender NVARCHAR(MAX) NULL,
    receiver NVARCHAR(MAX) NULL,
    FOREIGN KEY (sender) REFERENCES [users](username),
    FOREIGN KEY (receiver) REFERENCES [users](username)
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
