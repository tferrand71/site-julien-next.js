-- CreateTable
CREATE TABLE "HeroContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title_fr" TEXT NOT NULL DEFAULT 'CHEF D''ORCHESTRE',
    "title_en" TEXT NOT NULL DEFAULT 'CONDUCTOR',
    "title_de" TEXT NOT NULL DEFAULT 'DIRIGENT',
    "title_es" TEXT NOT NULL DEFAULT 'DIRECTOR DE ORQUESTA',
    "subtitle_fr" TEXT NOT NULL DEFAULT 'Tromboniste & Pédagogue',
    "subtitle_en" TEXT NOT NULL DEFAULT 'Trombonist & Educator',
    "subtitle_de" TEXT NOT NULL DEFAULT 'Posaunist & Pädagoge',
    "subtitle_es" TEXT NOT NULL DEFAULT 'Trombonista y Educador',
    "photoUrl" TEXT DEFAULT '/photo.jpg',
    "quote_fr" TEXT DEFAULT 'La musique est le silence qui tremble.',
    "quote_en" TEXT DEFAULT 'Music is the silence that trembles.',
    "quote_de" TEXT DEFAULT 'Musik ist das zitternde Schweigen.',
    "quote_es" TEXT DEFAULT 'La música es el silencio que tiembla.',
    "quoteAuthor" TEXT DEFAULT '— JULIEN JACQUEMART',
    "quoteEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "isUpcoming" BOOLEAN NOT NULL DEFAULT true,
    "title_fr" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_de" TEXT NOT NULL,
    "title_es" TEXT NOT NULL,
    "desc_fr" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_de" TEXT NOT NULL,
    "desc_es" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biography" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "content_fr" TEXT NOT NULL DEFAULT '',
    "content_en" TEXT NOT NULL DEFAULT '',
    "content_de" TEXT NOT NULL DEFAULT '',
    "content_es" TEXT NOT NULL DEFAULT '',
    "cvUrl" TEXT,
    "bioUrl" TEXT,

    CONSTRAINT "Biography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoConfig" (
    "id" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VideoConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repertoire" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "composer" TEXT NOT NULL,
    "piece" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Repertoire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CURRENT',
    "title_fr" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_de" TEXT NOT NULL,
    "title_es" TEXT NOT NULL,
    "desc_fr" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_de" TEXT NOT NULL,
    "desc_es" TEXT NOT NULL,
    "imageData" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastSeason" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title_fr" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_de" TEXT NOT NULL,
    "title_es" TEXT NOT NULL,
    "desc_fr" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_de" TEXT NOT NULL,
    "desc_es" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PastSeason_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoConfig_youtubeId_key" ON "VideoConfig"("youtubeId");
