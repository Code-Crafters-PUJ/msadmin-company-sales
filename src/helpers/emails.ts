import { Resend } from 'resend'

import { getEnvVariable } from '../config/environment'
import EmailError from '../errors/EmailError'

const resend = new Resend(getEnvVariable('RESEND_API_KEY')) // TODO: replace 'API_KEY' with your resend API key

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const emailData = {
    from: 'StockWage Admin <stockwage@santicm.com>',
    to: email,
    subject,
    text: message,
  }

  const emailResponse = await resend.emails.send(emailData)

  if (emailResponse.error) {
    throw new EmailError(`Failed to send email: ${emailResponse.error}`)
  }
}
