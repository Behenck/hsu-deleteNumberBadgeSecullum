"use client"
import { AdjusterForm, Button, Form, FormControl, Input, Main, Select, Window } from "./styles"
import Image from 'next/image'
import WomanBloodBankImage from '../assets/fundo.jpg'
import { api } from "@/services/api"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from "react-hot-toast"
import { useState } from "react"
import { Loading } from "@/components/Loading"

const DeleteNumberBadgeToSecullumFormSchema = z.object({
  number: z.string(),
})

type DeleteNumberBadgeToSecullumFormInputs = z.infer<typeof DeleteNumberBadgeToSecullumFormSchema>

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<DeleteNumberBadgeToSecullumFormInputs>({
    resolver: zodResolver(DeleteNumberBadgeToSecullumFormSchema),
  })

  async function handleUpdateBloodDonor(data: DeleteNumberBadgeToSecullumFormInputs) {
    setIsLoading(true)
    const { number } = data

    try {
      await api.post('/deleteNumberBadge', {
        number
      })
      setIsLoading(false)
      reset()
      toast.success("Dados atualizados com sucesso!")

    } catch (err) {
      toast.error("Esse crachá não esta cadastrado!")
      setIsLoading(false)
    }
  }

  return (
    <Main>
      <Toaster />
      <Window>
        <div>
          <Image src={WomanBloodBankImage} alt="image" width={500} height={500} />
        </div>
        <AdjusterForm>
          <h1>Remover crachá</h1>

          <Form onSubmit={handleSubmit(handleUpdateBloodDonor)}>
            <FormControl>
              <label htmlFor="donor">Número do crachá</label>
              <Input id="donor" type="text" {...register("number")} />
            </FormControl>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loading/> : "Deletar crachá"}
            </Button>
          </Form>
        </AdjusterForm>
      </Window>
    </Main>
  )
}