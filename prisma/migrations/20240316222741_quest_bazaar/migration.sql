-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "username" TEXT,
    "imgUrl" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "senderImgUrl" TEXT,
    "receiverImgUrl" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "players" INTEGER,
    "startingLevel" INTEGER,
    "finishingLevel" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT,
    "dmUserId" TEXT NOT NULL,
    "dmName" TEXT,
    "dmProfileImg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignChat" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "chat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignSchedules" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "scheduledEvent" TEXT NOT NULL,

    CONSTRAINT "CampaignSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignNote" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT,
    "private" BOOLEAN,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_dmUserId_fkey" FOREIGN KEY ("dmUserId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignChat" ADD CONSTRAINT "CampaignChat_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignSchedules" ADD CONSTRAINT "CampaignSchedules_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignNote" ADD CONSTRAINT "CampaignNote_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignPlayers" ADD CONSTRAINT "_CampaignPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignPlayers" ADD CONSTRAINT "_CampaignPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestingInvite" ADD CONSTRAINT "_RequestingInvite_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestingInvite" ADD CONSTRAINT "_RequestingInvite_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitedGame" ADD CONSTRAINT "_InvitedGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvitedGame" ADD CONSTRAINT "_InvitedGame_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
