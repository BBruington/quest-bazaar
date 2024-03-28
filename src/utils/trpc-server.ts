import { initTRPC } from "@trpc/server";
import { prisma } from "~/utils/context";
import { friendsForCampaignInvite } from "./types";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 m"),
});
export const t = initTRPC.create();

//clerkId
// this is our RPC API
export const appRouter = t.router({

  createNewCharacter: t.procedure.input(z.object({
    userId: z.string()
  })).mutation(async ({input}) => {
    const newCharacter = prisma.character.create({
      data: {
        userId: input.userId,
        charname: "New Character"
      }
    })

    return newCharacter;
  }),
  queryCharactersByUserId: t.procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const characters = prisma.character.findMany({
        where: {
          userId: input.userId,
        },
      });
      return characters;
    }),
  updateCharacterSheet: t.procedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        charname: z.string().optional().or(z.null()),
        classname: z.string().optional().or(z.null()),
        background: z.string().optional().or(z.null()),
        playername: z.string().optional().or(z.null()),
        race: z.string().optional().or(z.null()),
        alignment: z.string().optional().or(z.null()),
        level: z.number().optional().or(z.null()),
        strengthscore: z.number().optional().or(z.null()),
        dexterityscore: z.number().optional().or(z.null()),
        constitutionscore: z.number().optional().or(z.null()),
        wisdomscore: z.number().optional().or(z.null()),
        intelligencescore: z.number().optional().or(z.null()),
        charismascore: z.number().optional().or(z.null()),
        inspiration: z.boolean().optional().or(z.null()),
        proficiencybonus: z.number().optional().or(z.null()),
        strengthsave: z.number().optional().or(z.null()),
        strengthsaveprof: z.boolean().optional().or(z.null()),
        dexteritysave: z.number().optional().or(z.null()),
        dexteritysaveprof: z.boolean().optional().or(z.null()),
        constitutionsave: z.number().optional().or(z.null()),
        constitutionsaveprof: z.boolean().optional().or(z.null()),
        wisdomsave: z.number().optional().or(z.null()),
        wisdomsaveprof: z.boolean().optional().or(z.null()),
        intelligencesave: z.number().optional().or(z.null()),
        intelligencesaveprof: z.boolean().optional().or(z.null()),
        charismasave: z.number().optional().or(z.null()),
        charismasaveprof: z.boolean().optional().or(z.null()),
        acrobatics: z.number().optional().or(z.null()),
        acrobaticsexpertise: z.boolean().optional().or(z.null()),
        acrobaticsprof: z.boolean().optional().or(z.null()),
        animalhandling: z.number().optional().or(z.null()),
        animalhandlingexpertise: z.boolean().optional().or(z.null()),
        animalhandlingprof: z.boolean().optional().or(z.null()),
        arcana: z.number().optional().or(z.null()),
        arcanaexpertise: z.boolean().optional().or(z.null()),
        arcanaprof: z.boolean().optional().or(z.null()),
        athletics: z.number().optional().or(z.null()),
        athleticsexpertise: z.boolean().optional().or(z.null()),
        athleticsprof: z.boolean().optional().or(z.null()),
        deception: z.number().optional().or(z.null()),
        deceptionexpertise: z.boolean().optional().or(z.null()),
        deceptionprof: z.boolean().optional().or(z.null()),
        history: z.number().optional().or(z.null()),
        historyexpertise: z.boolean().optional().or(z.null()),
        historyprof: z.boolean().optional().or(z.null()),
        insight: z.number().optional().or(z.null()),
        insightexpertise: z.boolean().optional().or(z.null()),
        insightprof: z.boolean().optional().or(z.null()),
        intimidation: z.number().optional().or(z.null()),
        intimidationexpertise: z.boolean().optional().or(z.null()),
        intimidationprof: z.boolean().optional().or(z.null()),
        investigation: z.number().optional().or(z.null()),
        investigationexpertise: z.boolean().optional().or(z.null()),
        investigationprof: z.boolean().optional().or(z.null()),
        medicine: z.number().optional().or(z.null()),
        medicineexpertise: z.boolean().optional().or(z.null()),
        medicineprof: z.boolean().optional().or(z.null()),
        nature: z.number().optional().or(z.null()),
        natureexpertise: z.boolean().optional().or(z.null()),
        natureprof: z.boolean().optional().or(z.null()),
        perception: z.number().optional().or(z.null()),
        perceptionexpertise: z.boolean().optional().or(z.null()),
        perceptionprof: z.boolean().optional().or(z.null()),
        performance: z.number().optional().or(z.null()),
        performanceexpertise: z.boolean().optional().or(z.null()),
        performanceprof: z.boolean().optional().or(z.null()),
        persuasion: z.number().optional().or(z.null()),
        persuasionexpertise: z.boolean().optional().or(z.null()),
        persuasionprof: z.boolean().optional().or(z.null()),
        religion: z.number().optional().or(z.null()),
        religionexpertise: z.boolean().optional().or(z.null()),
        religionprof: z.boolean().optional().or(z.null()),
        sleightofhand: z.number().optional().or(z.null()),
        sleightofhandexpertise: z.boolean().optional().or(z.null()),
        sleightofhandprof: z.boolean().optional().or(z.null()),
        stealth: z.number().optional().or(z.null()),
        stealthexpertise: z.boolean().optional().or(z.null()),
        stealthprof: z.boolean().optional().or(z.null()),
        survival: z.number().optional().or(z.null()),
        survivalexpertise: z.boolean().optional().or(z.null()),
        survivalprof: z.boolean().optional().or(z.null()),
        passiveperception: z.number().optional().or(z.null()),
        otherprofs: z.string().optional().or(z.null()),
        ac: z.number().optional().or(z.null()),
        initiative: z.number().optional().or(z.null()),
        speed: z.number().optional().or(z.null()),
        maxhp: z.number().optional().or(z.null()),
        currenthp: z.number().optional().or(z.null()),
        temphp: z.number().optional().or(z.null()),
        totalhd: z.string().optional().or(z.null()),
        remaininghd: z.number().optional().or(z.null()),
        deathsuccess1: z.boolean().optional().or(z.null()),
        deathsuccess2: z.boolean().optional().or(z.null()),
        deathsuccess3: z.boolean().optional().or(z.null()),
        deathfail1: z.boolean().optional().or(z.null()),
        deathfail2: z.boolean().optional().or(z.null()),
        deathfail3: z.boolean().optional().or(z.null()),
        atkname1: z.string().optional().or(z.null()),
        atkbonus1: z.number().optional().or(z.null()),
        atkdamage1: z.string().optional().or(z.null()),
        atkname2: z.string().optional().or(z.null()),
        atkbonus2: z.number().optional().or(z.null()),
        atkdamage2: z.string().optional().or(z.null()),
        atkname3: z.string().optional().or(z.null()),
        atkbonus3: z.number().optional().or(z.null()),
        atkdamage3: z.string().optional().or(z.null()),
        cp: z.number().optional().or(z.null()),
        sp: z.number().optional().or(z.null()),
        ep: z.number().optional().or(z.null()),
        gp: z.number().optional().or(z.null()),
        pp: z.number().optional().or(z.null()),
        equipmentlist: z.string().optional().or(z.null()),
        personality: z.string().optional().or(z.null()),
        ideals: z.string().optional().or(z.null()),
        bonds: z.string().optional().or(z.null()),
        flaws: z.string().optional().or(z.null()),
        features: z.string().optional().or(z.null()),
      })
    )
    .mutation(async ({ input }) => {
      const character = await prisma.character.update({
        where: {
          id: input.id
        },
        data: {
          userId: input.userId,
          charname: input.charname,
          classname: input.classname,
          background: input.background,
          playername: input.playername,
          race: input.race,
          alignment: input.alignment,
          level: input.level,
          strengthscore: input.strengthscore,
          dexterityscore: input.dexterityscore,
          constitutionscore: input.constitutionscore,
          wisdomscore: input.wisdomscore,
          intelligencescore: input.intelligencescore,
          charismascore: input.charismascore,
          inspiration: input.inspiration,
          proficiencybonus: input.proficiencybonus,
          strengthsave: input.strengthsave,
          strengthsaveprof: input.strengthsaveprof,
          dexteritysave: input.dexteritysave,
          dexteritysaveprof: input.dexteritysaveprof,
          constitutionsave: input.constitutionsave,
          constitutionsaveprof: input.constitutionsaveprof,
          wisdomsave: input.wisdomsave,
          wisdomsaveprof: input.wisdomsaveprof,
          intelligencesave: input.intelligencesave,
          intelligencesaveprof: input.intelligencesaveprof,
          charismasave: input.charismasave,
          charismasaveprof: input.charismasaveprof,
          acrobatics: input.acrobatics,
          acrobaticsexpertise: input.acrobaticsexpertise,
          acrobaticsprof: input.acrobaticsprof,
          animalhandling: input.animalhandling,
          animalhandlingexpertise: input.animalhandlingexpertise,
          animalhandlingprof: input.animalhandlingprof,
          arcana: input.arcana,
          arcanaexpertise: input.arcanaexpertise,
          arcanaprof: input.arcanaprof,
          athletics: input.athletics,
          athleticsexpertise: input.athleticsexpertise,
          athleticsprof: input.athleticsprof,
          deception: input.deception,
          deceptionexpertise: input.deceptionexpertise,
          deceptionprof: input.deceptionprof,
          history: input.history,
          historyexpertise: input.historyexpertise,
          historyprof: input.historyprof,
          insight: input.insight,
          insightexpertise: input.insightexpertise,
          insightprof: input.insightprof,
          intimidation: input.intimidation,
          intimidationexpertise: input.intimidationexpertise,
          intimidationprof: input.intimidationprof,
          investigation: input.investigation,
          investigationexpertise: input.investigationexpertise,
          investigationprof: input.investigationprof,
          medicine: input.medicine,
          medicineexpertise: input.medicineexpertise,
          medicineprof: input.medicineprof,
          nature: input.nature,
          natureexpertise: input.natureexpertise,
          natureprof: input.natureprof,
          perception: input.perception,
          perceptionexpertise: input.perceptionexpertise,
          perceptionprof: input.perceptionprof,
          performance: input.performance,
          performanceexpertise: input.performanceexpertise,
          performanceprof: input.performanceprof,
          persuasion: input.persuasion,
          persuasionexpertise: input.persuasionexpertise,
          persuasionprof: input.persuasionprof,
          religion: input.religion,
          religionexpertise: input.religionexpertise,
          religionprof: input.religionprof,
          sleightofhand: input.sleightofhand,
          sleightofhandexpertise: input.sleightofhandexpertise,
          sleightofhandprof: input.sleightofhandprof,
          stealth: input.stealth,
          stealthexpertise: input.stealthexpertise,
          stealthprof: input.stealthprof,
          survival: input.survival,
          survivalexpertise: input.survivalexpertise,
          survivalprof: input.survivalprof,
          passiveperception: input.passiveperception,
          otherprofs: input.otherprofs,
          ac: input.ac,
          initiative: input.initiative,
          speed: input.speed,
          maxhp: input.maxhp,
          currenthp: input.currenthp,
          temphp: input.temphp,
          totalhd: input.totalhd,
          remaininghd: input.remaininghd,
          deathsuccess1: input.deathsuccess1,
          deathsuccess2: input.deathsuccess2,
          deathsuccess3: input.deathsuccess3,
          deathfail1: input.deathfail1,
          deathfail2: input.deathfail2,
          deathfail3: input.deathfail3,
          atkname1: input.atkname1,
          atkbonus1: input.atkbonus1,
          atkdamage1: input.atkdamage1,
          atkname2: input.atkname2,
          atkbonus2: input.atkbonus2,
          atkdamage2: input.atkdamage2,
          atkname3: input.atkname3,
          atkbonus3: input.atkbonus3,
          atkdamage3: input.atkdamage3,
          cp: input.cp,
          sp: input.sp,
          ep: input.ep,
          gp: input.gp,
          pp: input.pp,
          equipmentlist: input.equipmentlist,
          personality: input.personality,
          ideals: input.ideals,
          bonds: input.bonds,
          flaws: input.flaws,
          features: input.features,
        },
      });
    }),
  queryUser: t.procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      return user;
    }),

  queryUserCampaigns: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignsData = await prisma.user.findUnique({
        where: { clerkId: input.id },
        include: {
          campaignplayer: true,
          campaigndm: true,
        },
      });
      const userCampaigns = [
        ...userCampaignsData!.campaigndm,
        ...userCampaignsData!.campaignplayer,
      ];
      if (userCampaigns === undefined)
        throw new TRPCError({ code: "NOT_FOUND" });
      if (!userCampaigns) return null;
      return userCampaigns;
    }),

  queryUserSpecificCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignData = await prisma.campaign.findUnique({
        where: { id: input.id },
      });

      return userCampaignData;
    }),

  queryCampaigns: t.procedure.query(async () => {
    const allCampaigns = await prisma.campaign.findMany();
    return allCampaigns;
  }),

  queryUserInvitedCampaigns: t.procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const userCampaignsData = await prisma.user.findUnique({
        where: { clerkId: input.userId },
        include: {
          invitedCampaigns: true,
        },
      });
      const userCampaigns = [...userCampaignsData!.invitedCampaigns];
      if (userCampaigns === undefined)
        throw new TRPCError({ code: "NOT_FOUND" });
      if (!userCampaigns) return null;
      return userCampaigns;
    }),

  handleCampaignInvite: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
        userId: z.string(),
        campaignRes: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.campaignRes === "ACCEPTED") {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              players: {
                connect: {
                  clerkId: input.userId,
                },
              },
              invitedPlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      } else {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              invitedPlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      }
    }),

  createCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        dmProfileImg: z.string().optional(),
        dmName: z.string().optional(),
        imageUrl: z.string(),
        friendsIds: z.array(friendsForCampaignInvite).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const campaignData = await prisma.campaign.create({
        data: {
          name: input.name,
          description: input.description,
          image: input.imageUrl,
          dmName: input.dmName,
          dmProfileImg: input.dmProfileImg,
          dmUserId: input.id,
        },
      });
      if (!campaignData) throw new TRPCError({ code: "NOT_FOUND" });
      if (input.friendsIds !== undefined) {
        await prisma.campaign.update({
          where: {
            id: campaignData.id,
          },
          data: {
            invitedPlayers: {
              connect:
                input.friendsIds?.map((friendId) => ({
                  clerkId: friendId.id,
                })) || [],
            },
          },
        });
      }
      return campaignData;
    }),

  handleRequestToJoinGame: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
        userId: z.string(),
        campaignRes: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { success } = await ratelimit.limit(input.userId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      if (input.campaignRes === "ACCEPTED") {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              players: {
                connect: {
                  clerkId: input.userId,
                },
              },
              requestingInvitePlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      } else {
        try {
          const updatedCampaign = await prisma.campaign.update({
            where: {
              id: input.campaignId,
            },
            data: {
              requestingInvitePlayers: {
                disconnect: {
                  clerkId: input.userId,
                },
              },
            },
          });
          return updatedCampaign;
        } catch (error) {
          console.error("Error updating campaign: ", error);
          throw error;
        }
      }
    }),

  deleteCampaign: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.campaignNote.deleteMany({
        where: {
          campaignId: input.id,
        },
      });
      const deleted = await prisma.campaign.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),

  createCampaignScheduledEvent: t.procedure
    .input(
      z.object({
        time: z.string(),
        date: z.string(),
        scheduledEvent: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { success } = await ratelimit.limit(input.campaignId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const scheduledEvent = await prisma.campaignSchedules.create({
        data: {
          campaignId: input.campaignId,
          time: input.time,
          date: input.date,
          scheduledEvent: input.scheduledEvent,
        },
      });

      return scheduledEvent;
    }),

  queryCampaignMessages: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const messages = await prisma.campaignChat.findMany({
        where: {
          campaignId: input.campaignId,
        },
      });
      return messages;
    }),

  sendChatMessage: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
        username: z.string(),
        chat: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const sentMessage = await prisma.campaignChat.create({
        data: {
          campaignId: input.campaignId,
          username: input.username,
          chat: input.chat,
        },
      });
      return sentMessage;
    }),

  queryCampaignScheduledEvents: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const scheduledEvents = await prisma.campaignSchedules.findMany({
        where: {
          campaignId: input.campaignId,
        },
        orderBy: {
          date: "asc",
        },
      });

      return scheduledEvents;
    }),

  deleteCampaignScheduledEvent: t.procedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.campaignSchedules.delete({
        where: {
          id: input.eventId,
        },
      });
    }),

  requestInviteToCampaign: t.procedure
    .input(
      z.object({
        playerId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { success } = await ratelimit.limit(input.playerId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      try {
        const campaign = await prisma.campaign.findUnique({
          where: { id: input.campaignId },
          include: { requestingInvitePlayers: true, players: true }, // Include invitedPlayers relation
        });
        if (!campaign) {
          throw new Error("Campaign not found");
        }
        if (
          campaign.players.find((player) => player.clerkId === input.playerId)
        ) {
          return "ALREADY_PLAYER";
        }
        const updatedCampaign = await prisma.campaign.update({
          where: {
            id: input.campaignId,
          },
          data: {
            requestingInvitePlayers: {
              connect: {
                clerkId: input.playerId,
              },
            },
          },
        });
        return updatedCampaign;
      } catch (error) {
        console.error("error: ", error);
      }
    }),

  inviteToCampaign: t.procedure
    .input(
      z.object({
        playerId: z.string(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { success } = await ratelimit.limit(input.playerId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      try {
        const campaign = await prisma.campaign.findUnique({
          where: { id: input.campaignId },
          include: { invitedPlayers: true, players: true }, // Include invitedPlayers relation
        });
        if (!campaign) {
          throw new Error("Campaign not found");
        }
        if (
          campaign.players.find((player) => player.clerkId === input.playerId)
        ) {
          return "ALREADY_PLAYER";
        }
        const updatedCampaign = await prisma.campaign.update({
          where: {
            id: input.campaignId,
          },
          data: {
            invitedPlayers: {
              connect: {
                clerkId: input.playerId,
              },
            },
          },
        });
        return updatedCampaign;
      } catch (error) {
        console.error("error: ", error);
      }
    }),

  queryCampaignData: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const campaignData = await prisma.campaign.findUnique({
        where: {
          id: input.campaignId,
        },
        include: {
          players: true,
          requestingInvitePlayers: true,
        },
      });
      return campaignData;
    }),

  upsertCampaignNote: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
        userId: z.string(),
        private: z.boolean(),
        campaignId: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { success } = await ratelimit.limit(input.userId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const upsertCampaign = await prisma.campaignNote.upsert({
        where: {
          id: input.id,
        },
        update: {
          title: input.title,
          content: input.content,
        },
        create: {
          userId: input.userId,
          private: input.private,
          campaignId: input.campaignId,
          title: input.title,
          content: input.content,
        },
      });
      return upsertCampaign;
    }),

  deleteCampaignNote: t.procedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.id) {
        try {
          await prisma.campaignNote.delete({
            where: { id: input.id },
          });
        } catch (e) {
          console.error(e);
        }
      }
    }),

  queryCampaignPrivateNotes: t.procedure
    .input(z.object({ campaignId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      try {
        const myNotes = await prisma.campaignNote.findMany({
          where: {
            campaignId: input.campaignId,
            userId: input.userId,
            private: true,
          },
        });
        return myNotes;
      } catch (e) {
        console.error(e);
      }
    }),

  queryCampaignNotes: t.procedure
    .input(
      z.object({
        campaignId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const notes = await prisma.campaignNote.findMany({
          where: {
            campaignId: input.campaignId,
            private: false,
          },
        });
        return notes;
      } catch (e) {
        console.error("error", e);
      }
    }),
  // userId         String
  // players        Int?
  // startingLevel  Int?
  // finishingLevel Int?
  // title          String
  // description    String
  // author         String
  // mainImage      String
  // body           String
  // campaignId     String

  createCampaignPost: t.procedure
    .input(
      z.object({
        userId: z.string(),
        campaignId: z.string(),
        players: z.number(),
        startingLevel: z.number(),
        finishingLevel: z.number(),
        title: z.string(),
        description: z.string(),
        author: z.string(),
        mainImage: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const post = await prisma.post.create({
          data: {
            campaignId: input.campaignId,
            userId: input.userId,
            players: input.players,
            startingLevel: input.startingLevel,
            finishingLevel: input.finishingLevel,
            title: input.title,
            description: input.description,
            author: input.author,
            mainImage: input.mainImage,
            body: input.body,
          },
        });
        return post;
      } catch (e) {
        console.error(e);
      }
    }),

  queryCampaignPosts: t.procedure.query(async () => {
    try {
      const posts = await prisma.post.findMany({
        include: {
          comments: true,
          likes: true,
        },
      });
      return posts;
    } catch (e) {
      console.error(e);
      return null;
    }
  }),

  querySinglePost: t.procedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: input.postId,
          },
          include: {
            comments: true,
            likes: true,
          },
        });
        return post;
      } catch (e) {
        console.error(e);
        return null;
      }
    }),

  addFriend: t.procedure
    .input(
      z.object({
        receiverName: z.string(),
        senderName: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const recipient = await prisma.user.findUnique({
          where: {
            username: input.receiverName,
          },
          select: {
            clerkId: true,
            imgUrl: true,
          },
        });
        if (recipient === null) {
          console.log("failed to find friend");
          return false;
        }
        const sender = await prisma.user.findUnique({
          where: {
            clerkId: input.userId,
          },
          select: {
            clerkId: true,
            imgUrl: true,
          },
        });
        if (sender === null) {
          console.log("failed to find friend");
          return false;
        }
        const pendingFriend = await prisma.friendship.create({
          data: {
            receiverId: recipient.clerkId,
            receiverName: input.receiverName,
            receiverImgUrl: recipient.imgUrl,
            senderId: input.userId,
            senderName: input.senderName,
            senderImgUrl: sender.imgUrl,
            status: "PENDING",
          },
        });

        return pendingFriend;
      } catch (error) {
        console.error("error: ", error);
        return false;
      }
    }),

  queryMyFriendRequests: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const myRequests = await prisma.friendship.findMany({
        where: {
          OR: [
            {
              receiverId: input.id,
            },
            {
              senderId: input.id,
            },
          ],
          AND: [
            {
              status: "PENDING",
            },
          ],
        },
      });

      return myRequests;
    }),

  queryMyFriends: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const myRequests = await prisma.friendship.findMany({
        where: {
          OR: [
            {
              receiverId: input.id,
            },
            {
              senderId: input.id,
            },
          ],
          AND: [
            {
              status: "ACCEPTED",
            },
          ],
        },
      });

      return myRequests;
    }),

  handleFriendRequest: t.procedure
    .input(
      z.object({
        response: z.string(),
        senderId: z.string(),
        receiverId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.response === "ACCEPTED") {
        const acceptedFriend = await prisma.friendship.updateMany({
          where: {
            senderId: input.senderId,
            receiverId: input.receiverId,
          },
          data: {
            status: "ACCEPTED",
          },
        });
        return acceptedFriend;
      } else {
        const declinedFriend = await prisma.friendship.deleteMany({
          where: {
            senderId: input.senderId,
            receiverId: input.receiverId,
          },
        });

        return declinedFriend;
      }
    }),

  queryFriendMessages: t.procedure
    .input(
      z.object({
        userId: z.string(),
        friendSenderId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const messagesData = await prisma.message.findMany({
          where: {
            OR: [
              {
                senderId: input.userId,
              },
              {
                recipientId: input.userId,
              },
            ],
          },
          orderBy: {
            sentAt: "asc",
          },
        });
        const filteredMessages = messagesData.filter((message) => {
          return (
            message.senderId === input.friendSenderId ||
            message.recipientId === input.friendSenderId
          );
        });
        return filteredMessages;
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
    }),

  sendMessage: t.procedure
    .input(
      z.object({
        userId: z.string(),
        friendId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const message = await prisma.message.create({
          data: {
            senderId: input.userId,
            recipientId: input.friendId,
            content: input.content,
          },
        });
        return message;
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
