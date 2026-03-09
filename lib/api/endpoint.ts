import type { CityOverviewResponse } from "../types/city";
import { DeviceOverviewResponse, NetworkGraphListResponse, NetworkOverviewResponse } from "../types/network-overview";
import { apiGet } from "./client";

// Define API endpoints for fetching city overview data
export const getCityOverview = () => apiGet<CityOverviewResponse>("/cities/")

// Define API endpoints for fetching network overview data
export const getNetworkOverview = () => apiGet<NetworkOverviewResponse>("/network-overview/")

// Define API endpoints for fetching network graph data (time series)
export const getNetworkGraphData = () => apiGet<NetworkGraphListResponse>("/network-overview/graph/")

// Define API endpoints for fetching device overview data
export const getDeviceOverview = () => apiGet<DeviceOverviewResponse>("/devices/")