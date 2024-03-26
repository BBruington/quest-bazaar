import * as z from 'zod'

export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, { message: 'Message must be at least 1 characters.' })
})
