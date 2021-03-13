-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "added" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "date" TEXT NOT NULL,
    "rates" JSONB NOT NULL,

    PRIMARY KEY ("date")
);

-- CreateIndex
CREATE INDEX "Currency.added_index" ON "Currency"("added");
