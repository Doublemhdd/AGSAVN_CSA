"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  Clock,
  HelpCircle,
  Info,
  Minus,
  Target,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

interface IndicatorDetailProps {
  indicator: {
    id: string
    name: string
    description: string
    methodology: string
    thresholds: {
      value: string
      label: string
      color: string
    }[]
    currentValue: number
    trend: string
    status: string
  }
}

const statusColors = {
  normal: "bg-green-500",
  warning: "bg-yellow-500",
  alert: "bg-orange-500",
  critical: "bg-red-500",
}

const trendIcons = {
  up: <ArrowUp className="h-4 w-4" />,
  down: <ArrowDown className="h-4 w-4" />,
  stable: <Minus className="h-4 w-4" />,
}

const categoryLabels: Record<string, string> = {
  food: "Sécurité Alimentaire",
  nutrition: "Nutrition",
  water: "Eau et Assainissement",
  vulnerability: "Vulnérabilité des Ménages",
  agriculture: "Agriculture",
  livestock: "Élevage",
  market: "Marché",
}

export function IndicatorDetail({ indicator }: IndicatorDetailProps) {
  const [showMethodology, setShowMethodology] = useState(false)

  // Déterminer la couleur du statut
  const statusColor = statusColors[indicator.status]

  // Déterminer l'icône de tendance
  const trendIcon = trendIcons[indicator.trend]

  // Calculer le pourcentage pour la barre de progression
  const calculateProgress = () => {
    // const { normal, warning, alert, critical } = indicator.thresholds
    // const max = Math.max(normal, warning, alert, critical)
    // return (indicator.value / max) * 100
    return 75 // Placeholder value
  }

  // Formater la date de dernière mise à jour
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Déterminer le message de tendance
  const getTrendMessage = () => {
    switch (indicator.trend) {
      case "up":
        return indicator.status === "normal" ? "Amélioration" : "Détérioration"
      case "down":
        return indicator.status === "normal" ? "Détérioration" : "Amélioration"
      case "stable":
        return "Stable"
      default:
        return ""
    }
  }

  // Déterminer le message de statut
  const getStatusMessage = () => {
    switch (indicator.status) {
      case "normal":
        return "Normal - Aucune action requise"
      case "warning":
        return "Attention - Surveillance recommandée"
      case "alert":
        return "Alerte - Intervention recommandée"
      case "critical":
        return "Critique - Intervention urgente requise"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              {categoryLabels[indicator.name] || indicator.name}
            </Badge>
            <CardTitle className="text-xl">{indicator.name}</CardTitle>
            <CardDescription>{indicator.description}</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={() => setShowMethodology(!showMethodology)}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showMethodology && (
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Méthodologie</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>{indicator.methodology}</p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="map">Carte</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Valeur actuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">
                      {indicator.currentValue}
                      {/* <span className="ml-1 text-sm font-normal">{indicator.unit}</span> */}
                    </div>
                    <div className="flex items-center gap-1">
                      {trendIcon}
                      <span className="text-sm">{getTrendMessage()}</span>
                    </div>
                  </div>
                  <Progress value={calculateProgress()} className="mt-2 h-2" indicatorClassName={statusColor} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${statusColor}`} />
                    <span className="font-medium capitalize">{indicator.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{getStatusMessage()}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Évolution sur 6 mois</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                <IndicatorChart
                  data={[]} // indicator.historicalData
                  category={indicator.name}
                  unit={""} // indicator.unit
                  thresholds={{}} // indicator.thresholds
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Seuils d'alerte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {indicator.thresholds.map((threshold) => (
                      <div className="flex items-center justify-between" key={threshold.label}>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: threshold.color }} />
                          <span>{threshold.label}</span>
                        </div>
                        <span>{threshold.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Dernière mise à jour: {formatDate("2024-01-01")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Fréquence de collecte: Mensuelle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Objectif: {indicator.status === "normal" ? "Atteint" : "Non atteint"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>Description détaillée</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">{indicator.description}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="methodology">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>Méthodologie</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">{indicator.methodology}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="thresholds">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Seuils d'alerte</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {indicator.thresholds.map((threshold) => (
                      <div className="flex items-center justify-between" key={threshold.label}>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: threshold.color }} />
                          <span>{threshold.label}</span>
                        </div>
                        <span>{threshold.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {indicator.id && false && (
                <AccordionItem value="related">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      <span>Indicateurs liés</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 text-sm">
                      {/* {indicator.relatedIndicators.map((related, index) => (
                        <li key={index}>{related}</li>
                      ))} */}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Données historiques</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <IndicatorChart
                  data={[]} // indicator.historicalData
                  category={indicator.name}
                  unit={""} // indicator.unit
                  thresholds={{}} // indicator.thresholds
                  showThresholds={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Distribution géographique</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                {false ? ( // indicator.geographicalData
                  <IndicatorMap
                    data={[]} // indicator.geographicalData
                    category={indicator.name}
                    thresholds={{}} // indicator.thresholds
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Données géographiques non disponibles pour cet indicateur</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${statusColor} text-white`}>
              {indicator.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{getStatusMessage()}</span>
          </div>
          <Button variant="outline" size="sm">
            Exporter les données
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

