import { Resend } from 'resend'

import { getEnvVariable } from '../config/environment'

const resend = new Resend(getEnvVariable('RESEND_API_KEY')) // TODO: replace 'API_KEY' with your resend API key

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const emailData = {
    from: 'StockWage Admin <onboarding@resend.dev>', // TODO: replace with a valid email
    to: email,
    subject,
    text: message,
  }

  console.log(await resend.emails.send(emailData))
}
