import type { CityOverviewResponse } from "../types/city";
import { apiGet } from "./client";

// Define API endpoints
export const getCityOverview = () => 
    apiGet<CityOverviewResponse>("/cities/")