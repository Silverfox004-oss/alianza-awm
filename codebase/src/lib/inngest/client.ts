import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'ai-workforce-map',
  eventKey: process.env.INNGEST_EVENT_KEY,
})
