import CurrentWeather from '@/components/current-weather.js';
import { FavoriteCities } from '@/components/favorite-cities.js';
import HourlyTemperature from '@/components/hourly-temperature.js';
import WeatherSkeleton from '@/components/loading-skeleton.js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.js';
import { Button } from '@/components/ui/button.js';
import WeatherDetails from '@/components/weather-details.js';
import { WeatherForecast } from '@/components/weather-forcast.js';
import { useGeolocation } from '@/hooks/use-geolocation.js';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather.js';
import { RefreshCw, MapPin, AlertCircle } from 'lucide-react';
import React from 'react';

const WeatherDashboard = () => {
    const {coordinates, error: locationError, getLocation, isLoading: locationLoading} = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation();
        if(coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    }

    if(locationLoading) {
        return <WeatherSkeleton/>
    }

    if (locationError) {
        return(        
        <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
            <p>{locationError}</p>
            <Button onClick={getLocation} variant="outline" className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location Services
            </Button>
        </AlertDescription>
      </Alert>
       )
    }

    if (!coordinates) {
        return(        
        <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
            <p>Please enable location access to see your local weather.</p>
            <Button onClick={getLocation} variant="outline" className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location Services
            </Button>
        </AlertDescription>
      </Alert>
       )
    }

    const locationName = locationQuery?.data?.[0];

    if(weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className='flex flex-col gap-4'>
                <p>Failed to fetch weather data, please try again.</p>
                <Button onClick={handleRefresh} variant="outline" className="w-fit">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                </Button>
            </AlertDescription>
        </Alert>
        );
    }

    if(!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton/>
    }

    return (
        <div className="space-y-4">
            <FavoriteCities />
            <div className="flex justify-between items-center">                
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick = {handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin": "" }`}/></Button>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    <HourlyTemperature data= {forecastQuery.data}/>
                </div>

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    )
}

export default WeatherDashboard;