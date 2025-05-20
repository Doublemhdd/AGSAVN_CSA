"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { getData } from "@/lib/api";

interface Indicator {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    code: string;
  };
  value?: number;
  unit?: string;
  threshold_low?: number;
  threshold_high?: number;
}

interface UseIndicatorsReturn {
  indicators: Indicator[];
  isLoading: boolean;
  error: string | null;
  refreshIndicators: () => Promise<void>;
}

export function useIndicators(): UseIndicatorsReturn {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchIndicators = async () => {
    if (!isAuthenticated) {
      setError("Not authenticated");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getData<Indicator[]>("indicators");
      setIndicators(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      // Fall back to dummy data if API is unavailable
      setIndicators([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchIndicators();
    }
  }, [isAuthenticated]);

  return {
    indicators,
    isLoading,
    error,
    refreshIndicators: fetchIndicators,
  };
} 