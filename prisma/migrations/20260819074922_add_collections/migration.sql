-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionCraft" (
    "collectionId" TEXT NOT NULL,
    "craftId" TEXT NOT NULL,

    CONSTRAINT "CollectionCraft_pkey" PRIMARY KEY ("collectionId","craftId")
);

-- AddForeignKey
ALTER TABLE "CollectionCraft" ADD CONSTRAINT "CollectionCraft_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionCraft" ADD CONSTRAINT "CollectionCraft_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
