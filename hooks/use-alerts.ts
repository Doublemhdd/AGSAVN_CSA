"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { getData } from "@/lib/api";

interface Alert {
  id: string;
  indicator: {
    id: string;
    name: string;
    category: {
      id: string;
      code: string;
      name: string;
    };
  };
  region: {
    id: string;
    name: string;
  };
  value: number;
  threshold_value: number;
  threshold_type: "low" | "high";
  severity: "critical" | "high" | "medium" | "low";
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "RESOLVED";
  created_at: string;
}

interface UseAlertsReturn {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  refreshAlerts: () => Promise<void>;
}

export function useAlerts(): UseAlertsReturn {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchAlerts = async () => {
    if (!isAuthenticated) {
      setError("Not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getData<Alert[]>("alerts");
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      // Fall back to dummy data if API is unavailable
      setAlerts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAlerts();
    }
  }, [isAuthenticated]);

  return {
    alerts,
    isLoading,
    error,
    refreshAlerts: fetchAlerts,
  };
} 