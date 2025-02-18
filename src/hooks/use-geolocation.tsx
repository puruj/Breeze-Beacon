import { useEffect, useState } from "react";
import type { Coordinates } from "@/api/types";
import { get } from "http";

interface GeoLocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeoLocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({...prev, isLoading: true, error: null}));
        if(!navigator.geolocation) {
            setLocationData(() => ({coordinates: null, error: "Geolocation is not supported", isLoading: false}));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    error: null,
                    isLoading: false,
                });
            },
            (error) => {
                let errorMessage: string;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "User denied the request for Geolocation. Please enable location services in your browser settings.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                }
                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });      
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    };

}