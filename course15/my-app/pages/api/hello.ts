// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  customers: Customer[]
}
type Customer = {
  name: string
}

const mydata:Customer[] = [{ name: 'John Doe' }, { name: 'Ben Wu' }]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ customers:mydata })
  //res.status(200).json(mydata)
}
