-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT NOT NULL,
    "username" TEXT,
    "imgUrl" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "senderImgUrl" TEXT,
    "receiverImgUrl" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "players" INTEGER,
    "startingLevel" INTEGER,
    "finishingLevel" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "campaignId" TEXT
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT,
    "dmUserId" TEXT NOT NULL,
    "dmName" TEXT,
    "dmProfileImg" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CampaignChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "chat" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CampaignSchedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "scheduledEvent" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CampaignNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT,
    "private" BOOLEAN,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "charname" TEXT,
    "classname" TEXT,
    "background" TEXT,
    "playername" TEXT,
    "race" TEXT,
    "alignment" TEXT,
    "level" INTEGER,
    "strengthscore" INTEGER,
    "dexterityscore" INTEGER,
    "constitutionscore" INTEGER,
    "wisdomscore" INTEGER,
    "intelligencescore" INTEGER,
    "charismascore" INTEGER,
    "inspiration" BOOLEAN,
    "proficiencybonus" INTEGER,
    "strengthsave" INTEGER,
    "strengthsaveprof" BOOLEAN,
    "dexteritysave" INTEGER,
    "dexteritysaveprof" BOOLEAN,
    "constitutionsave" INTEGER,
    "constitutionsaveprof" BOOLEAN,
    "wisdomsave" INTEGER,
    "wisdomsaveprof" BOOLEAN,
    "intelligencesave" INTEGER,
    "intelligencesaveprof" BOOLEAN,
    "charismasave" INTEGER,
    "charismasaveprof" BOOLEAN,
    "acrobatics" INTEGER,
    "acrobaticsexpertise" BOOLEAN,
    "acrobaticsprof" BOOLEAN,
    "animalhandling" INTEGER,
    "animalhandlingexpertise" BOOLEAN,
    "animalhandlingprof" BOOLEAN,
    "arcana" INTEGER,
    "arcanaexpertise" BOOLEAN,
    "arcanaprof" BOOLEAN,
    "athletics" INTEGER,
    "athleticsexpertise" BOOLEAN,
    "athleticsprof" BOOLEAN,
    "deception" INTEGER,
    "deceptionexpertise" BOOLEAN,
    "deceptionprof" BOOLEAN,
    "history" INTEGER,
    "historyexpertise" BOOLEAN,
    "historyprof" BOOLEAN,
    "insight" INTEGER,
    "insightexpertise" BOOLEAN,
    "insightprof" BOOLEAN,
    "intimidation" INTEGER,
    "intimidationexpertise" BOOLEAN,
    "intimidationprof" BOOLEAN,
    "investigation" INTEGER,
    "investigationexpertise" BOOLEAN,
    "investigationprof" BOOLEAN,
    "medicine" INTEGER,
    "medicineexpertise" BOOLEAN,
    "medicineprof" BOOLEAN,
    "nature" INTEGER,
    "natureexpertise" BOOLEAN,
    "natureprof" BOOLEAN,
    "perception" INTEGER,
    "perceptionexpertise" BOOLEAN,
    "perceptionprof" BOOLEAN,
    "performance" INTEGER,
    "performanceexpertise" BOOLEAN,
    "performanceprof" BOOLEAN,
    "persuasion" INTEGER,
    "persuasionexpertise" BOOLEAN,
    "persuasionprof" BOOLEAN,
    "religion" INTEGER,
    "religionexpertise" BOOLEAN,
    "religionprof" BOOLEAN,
    "sleightofhand" INTEGER,
    "sleightofhandexpertise" BOOLEAN,
    "sleightofhandprof" BOOLEAN,
    "stealth" INTEGER,
    "stealthexpertise" BOOLEAN,
    "stealthprof" BOOLEAN,
    "survival" INTEGER,
    "survivalexpertise" BOOLEAN,
    "survivalprof" BOOLEAN,
    "passiveperception" INTEGER,
    "otherprofs" TEXT,
    "ac" INTEGER,
    "initiative" INTEGER,
    "speed" INTEGER,
    "maxhp" INTEGER,
    "currenthp" INTEGER,
    "temphp" INTEGER,
    "totalhd" TEXT,
    "remaininghd" INTEGER,
    "deathsuccess1" BOOLEAN,
    "deathsuccess2" BOOLEAN,
    "deathsuccess3" BOOLEAN,
    "deathfail1" BOOLEAN,
    "deathfail2" BOOLEAN,
    "deathfail3" BOOLEAN,
    "atkname1" TEXT,
    "atkbonus1" INTEGER,
    "atkdamage1" TEXT,
    "atkname2" TEXT,
    "atkbonus2" INTEGER,
    "atkdamage2" TEXT,
    "atkname3" TEXT,
    "atkbonus3" INTEGER,
    "atkdamage3" TEXT,
    "cp" INTEGER,
    "sp" INTEGER,
    "ep" INTEGER,
    "gp" INTEGER,
    "pp" INTEGER,
    "equipmentlist" TEXT,
    "personality" TEXT,
    "ideals" TEXT,
    "bonds" TEXT,
    "flaws" TEXT,
    "features" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_CampaignPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RequestingInvite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InvitedGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignPlayers_AB_unique" ON "_CampaignPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignPlayers_B_index" ON "_CampaignPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestingInvite_AB_unique" ON "_RequestingInvite"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestingInvite_B_index" ON "_RequestingInvite"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvitedGame_AB_unique" ON "_InvitedGame"("A", "B");

-- CreateIndex
CREATE INDEX "_InvitedGame_B_index" ON "_InvitedGame"("B");

