"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    "Sécurité Alimentaire": 65,
    Nutrition: 78,
    "Eau-Hygiène": 80,
  },
  {
    name: "Fév",
    "Sécurité Alimentaire": 59,
    Nutrition: 75,
    "Eau-Hygiène": 82,
  },
  {
    name: "Mar",
    "Sécurité Alimentaire": 62,
    Nutrition: 77,
    "Eau-Hygiène": 81,
  },
  {
    name: "Avr",
    "Sécurité Alimentaire": 58,
    Nutrition: 77,
    "Eau-Hygiène": 81,
  },
  {
    name: "Mai",
    "Sécurité Alimentaire": 63,
    Nutrition: 76,
    "Eau-Hygiène": 80,
  },
  {
    name: "Juin",
    "Sécurité Alimentaire": 67,
    Nutrition: 78,
    "Eau-Hygiène": 83,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sécurité Alimentaire" fill="#f97316" />
        <Bar dataKey="Nutrition" fill="#10b981" />
        <Bar dataKey="Eau-Hygiène" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

