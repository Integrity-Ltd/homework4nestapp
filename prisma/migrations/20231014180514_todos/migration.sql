-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "user_id" INTEGER,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "systemuser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
