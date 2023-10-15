-- CreateTable
CREATE TABLE "systemuser" (
    "id" SERIAL NOT NULL,
    "enabled" BOOLEAN,
    "username" VARCHAR(128),
    "password" VARCHAR(255),
    "fingerprint" VARCHAR(255),
    "usergroup" INTEGER,

    CONSTRAINT "systemuser_pkey" PRIMARY KEY ("id")
);
