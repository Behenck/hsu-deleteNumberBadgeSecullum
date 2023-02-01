import { NextApiRequest, NextApiResponse  } from "next";
import { Prisma } from '@prisma/client'
import { AnyZodObject, z } from 'zod'
import { prisma } from "../../../prisma";

interface findProps {
  numero: string
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { number } = request.body

  const numberFormmat = parseInt(number)

  const find: findProps[] = await prisma.$queryRaw(
    Prisma.sql`SELECT * FROM pessoas_varios_numeros WHERE numero=${numberFormmat}`
  )

  if (find.length > 0) {
    await prisma.$queryRaw(
      Prisma.sql`DELETE FROM pessoas_varios_numeros WHERE numero=${numberFormmat}`
    )
    response.status(200).json({})
  } 

  return response.status(404).json({
    message: "Crachá não encontrada"
  })
}