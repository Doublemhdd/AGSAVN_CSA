"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { getData } from "@/lib/api"

// Fallback data if API is not available
const fallbackData = [
  {
    name: "Jan",
    "Sécurité Alimentaire": 65,
    "Nutrition": 78,
    "Eau-Hygiène": 80,
  },
  {
    name: "Fév",
    "Sécurité Alimentaire": 59,
    "Nutrition": 75,
    "Eau-Hygiène": 82,
  },
  {
    name: "Mar",
    "Sécurité Alimentaire": 62,
    "Nutrition": 77,
    "Eau-Hygiène": 81,
  },
  {
    name: "Avr",
    "Sécurité Alimentaire": 58,
    "Nutrition": 77,
    "Eau-Hygiène": 81,
  },
  {
    name: "Mai",
    "Sécurité Alimentaire": 63,
    "Nutrition": 76,
    "Eau-Hygiène": 80,
  },
  {
    name: "Juin",
    "Sécurité Alimentaire": 67,
    "Nutrition": 78,
    "Eau-Hygiène": 83,
  },
]

interface TrendDataPoint {
  name: string;
  [key: string]: string | number;
}

export function Overview() {
  const [data, setData] = useState<TrendDataPoint[]>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setData(fallbackData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Try to get data from the API
        try {
          const apiData = await getData<TrendDataPoint[]>("stats/indicators-trends");
          setData(apiData);
        } catch (apiError) {
          console.warn("Could not fetch from API, using fallback data:", apiError);
          // Use fallback data if API fails
          setData(fallbackData);
        }
        
      } catch (err) {
        console.error("Error fetching trends:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !data.length) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error}. Impossible de charger les données de tendance.
        </AlertDescription>
      </Alert>
    );
  }

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

