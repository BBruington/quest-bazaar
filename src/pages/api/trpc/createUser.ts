import { prisma } from "~/server/db";
import type { IncomingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';

const webhookSecret: string  = process.env.WEBHOOK_SECRET!;

export default  function createUser(
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
    } catch(_) {
      // If the verification fails, return a 400 error
      return res.status(400).json({});
    }
    const { id } = evt.data;

    const eventType = evt.type;
    if ( eventType === 'user.created') {
      // const newUser = await prisma.user.create({ data: {} });
      console.log("req", payload);
      console.log("header", headers);
      console.log("evt data", evt.data);
    }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};