import { useSearchParams, useParams } from 'react-router-dom';
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather.js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.js';
import WeatherSkeleton from '@/components/loading-skeleton.js';
import { FavoriteButton } from '@/components/favorite-button.js';
import CurrentWeather from '@/components/current-weather.js';
import HourlyTemperature from '@/components/hourly-temperature.js';
import WeatherDetails from '@/components/weather-details.js';
import { WeatherForecast } from '@/components/weather-forcast.js';

const CityPage = () => {

    const[searchParams] = useSearchParams();
    const params =  useParams();
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    const coordinates = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if(weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className='flex flex-col gap-4'>
                <p>Failed to fetch weather data, please try again.</p>            
            </AlertDescription>
        </Alert>
        );
    }

    if(!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeleton/>
    }


    return (
        <div className="space-y-4">
        <div className="flex justify-between items-center">                
            <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
            <div className="flex gap-2">
                <FavoriteButton
                    data={{ ...weatherQuery.data, name: params.cityName }}
                />
            </div>
        </div>

        <div className="grid gap-6">
            <div className="flex flex-col gap-4">
                <CurrentWeather data={weatherQuery.data} />
                <HourlyTemperature data= {forecastQuery.data}/>
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
                <WeatherDetails data={weatherQuery.data} />
                <WeatherForecast data={forecastQuery.data} />
            </div>
        </div>
        </div>
    )
};

export default CityPage;