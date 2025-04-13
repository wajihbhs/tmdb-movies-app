import type { Vehicle } from "~/types/vehicle";
import type { Response } from "~/types/response";
import { useNuxtApp } from "#app";
import { transformKeysToCamelCase } from "~/utils/formatters";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const { $axios } = useNuxtApp();

  try {
    const response = await $axios.get<Response>("/");

    if (!response.data || !Array.isArray(response.data.results)) {
      throw new Error("Invalid API response structure.");
    }
    return response.data.results.map(
      (item) => transformKeysToCamelCase(item) as unknown as Vehicle
    );
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
};
