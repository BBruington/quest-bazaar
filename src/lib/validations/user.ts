import * as z from 'zod'

export const userNameSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(32, {
      message: 'Username is too long. It must be under 32 characters.',
    }),
})
