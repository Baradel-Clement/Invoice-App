import { NextApiRequest, NextApiResponse } from 'next';
import { formatInvoiceDate } from '../../utils/invoices';
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.EMAIL_SERVER_PASSWORD)

type Item = { name: string; price: number; quantity: number; total: number; }

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const body = JSON.parse(req.body);
        const message = `

          You have until ${formatInvoiceDate(body.invoice.invoiceDate)} to pay this invoice !\r\n
          Items:\r\n
          Name Qty Price Total
          ${body.invoice.items.map((item: Item) => `\r\n${item.name} ${item.quantity} ${item.price} £ ${item.total}`)}
          \r\n<b>Amount due : £ ${body.invoice.total}
        `;

        const data = {
          to: body.emailTo,
          from: 'invoice-app@baradelclement.com',
          subject: `${body.name} sent you an invoice with Invoice-app`,
          text: message,
          html: message.replace(/\r\n/g, '<br>')
        };

        mail.send(data)

        res.status(200).json({ status: 'Ok' })
      default:
        break;
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}