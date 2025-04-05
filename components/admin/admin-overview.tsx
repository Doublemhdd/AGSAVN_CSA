"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    Alertes: 12,
    Utilisateurs: 8,
  },
  {
    name: "Fév",
    Alertes: 15,
    Utilisateurs: 9,
  },
  {
    name: "Mar",
    Alertes: 10,
    Utilisateurs: 10,
  },
  {
    name: "Avr",
    Alertes: 18,
    Utilisateurs: 10,
  },
  {
    name: "Mai",
    Alertes: 14,
    Utilisateurs: 11,
  },
  {
    name: "Juin",
    Alertes: 7,
    Utilisateurs: 12,
  },
]

export function AdminOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Alertes" stroke="#ef4444" strokeWidth={2} />
        <Line type="monotone" dataKey="Utilisateurs" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

