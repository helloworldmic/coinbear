select *
from "user";
-- -->to check what 's in user 
-- not this one: select *from user---> will go to default table, user, in psql 

-- need to add foreign key later , as well as other table relations 

CREATE TABLE "user"(
    "id" Serial primary key,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "transaction"(
    "id" Serial primary key,
    "userID" INTEGER NOT NULL,
    "side" VARCHAR(255) NOT NULL,
    "pair" VARCHAR(255) NOT NULL,
    "executedPrice" DOUBLE PRECISION NOT NULL,
    "executed" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "unixTimestamp" BIGINT NOT NULL,
    "datetime" VARCHAR(255) NOT NULL
);

CREATE TABLE "portfolio"(
    "id" Serial primary key,
    "userID" INTEGER NOT NULL,
    "pair" VARCHAR(255) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL
    -- quantity = amount in other tables 
);


-- CREATE TABLE "price"(
--     "id" Serial primary key,
--     "assetID" INTEGER NOT NULL,
--     "priceUSD" DOUBLE PRECISION NOT NULL,
--     "unixTimestamp" BIGINT NOT NULL,
--     "datetime" VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE "portfolio"(
--     "id" Serial primary key,
--     "coin" DOUBLE PRECISION NOT NULL,
--     "bought" DOUBLE PRECISION NOT NULL,
--     "price" DOUBLE PRECISION NOT NULL,
--     "executed" DOUBLE PRECISION NOT NULL,
--     "amount" DOUBLE PRECISION NOT NULL,
--     -- "portfolioName" VARCHAR(255) NOT NULL,
--     "userID" INTEGER NOT NULL
-- );
-- CREATE TABLE "fee"(
--     "id" Serial primary key,
--     "fixedFee" DOUBLE PRECISION NOT NULL,
--     "adValFee" DOUBLE PRECISION NOT NULL,
--     "unixTimestamp" BIGINT NOT NULL,
--     "datetime" VARCHAR(255) NOT NULL
-- );
-- ALTER TABLE
--     "transaction" ADD CONSTRAINT "transaction_userid_foreign" FOREIGN KEY("userID") REFERENCES "user"("id");
-- ALTER TABLE
--     "portfolio" ADD CONSTRAINT "portfolio_userid_foreign" FOREIGN KEY("userID") REFERENCES "user"("id");
-- ALTER TABLE
--     "transaction" ADD CONSTRAINT "transaction_assetid_foreign" FOREIGN KEY("assetID") REFERENCES "asset"("id");
-- ALTER TABLE
--     "price" ADD CONSTRAINT "price_assetid_foreign" FOREIGN KEY("assetID") REFERENCES "asset"("id");
-- ALTER TABLE
--     "transaction" ADD CONSTRAINT "transaction_portfolioid_foreign" FOREIGN KEY("portfolioID") REFERENCES "portfolio"("id");