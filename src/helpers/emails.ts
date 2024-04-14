import { Resend } from 'resend'

import { RESEND_API_KEY } from '../config/environment'
import { EmailError } from '../errors'

const resend = new Resend(RESEND_API_KEY)

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
