import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { prisma } from "~/server/db";
 
const webhookSecret: string = process.env.WEBHOOK_SECRET!;
 
export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);
 
  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  } 
  const { id,} = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    await prisma.user.upsert({
      where: { externalId: id },
      create: {
        email: evt.data.email_addresses[0]!.email_address,
        externalId: id!,
        username: evt.data.username
      },
      update: {
        email: evt.data.email_addresses[0]!.email_address,
        username: evt.data.username
      },
    });
    res.status(201).json({});
  }

  if ( eventType === 'user.deleted') {
    await prisma.user.delete({
      where: { externalId: id }
    })
    res.status(200).json({});
  }
}
 
type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};