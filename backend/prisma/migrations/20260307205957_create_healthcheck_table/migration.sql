-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "health_checks" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "checked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" geometry(Point, 4326),

    CONSTRAINT "health_checks_pkey" PRIMARY KEY ("id")
);
