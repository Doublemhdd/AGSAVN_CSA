"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simuler l'envoi d'un email de réinitialisation
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast({
        title: "Email envoyé",
        description: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
        variant: "default",
      })
    }, 1500)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex flex-col items-center mb-4">
            <Image src="/images/logo_csa.png" alt="CSA Logo" width={60} height={60} className="h-16 w-16 mb-2" />
            <CardTitle className="text-2xl font-bold">Mot de passe oublié</CardTitle>
          </div>
          <CardDescription>
            Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <div className="flex items-center">
                  <Icons.check className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Un email a été envoyé à {email} avec les instructions pour réinitialiser votre mot de passe.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier de spam ou essayez à
                nouveau.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              <Link href="/login" className="text-primary hover:underline">
                Retour à la page de connexion
              </Link>
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">© 2023 AGSAVN CSA. Tous droits réservés.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

