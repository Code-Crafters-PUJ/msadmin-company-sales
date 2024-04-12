import { Resend } from 'resend'

const resend = new Resend('API_KEY') // TODO: replace 'API_KEY' with your resend API key

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const emailData = {
    from: '', // TODO: replace with a valid email
    to: email,
    subject,
    text: message,
  }

  await resend.emails.send(emailData)
}
