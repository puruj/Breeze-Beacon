import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/use-geolocation';
import { RefreshCw, MapPin, AlertCircle } from 'lucide-react';
import React from 'react';

const WeatherDashboard = () => {
    const {coordinates, error: locationError, getLocation, isLoading: locationLoading} = useGeolocation();

    const handleRefresh = () => {
        getLocation();
        if(coordinates) {
            // fetchWeatherData(coordinates);
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

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">                
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick = {handleRefresh}
                    // disabled={}
                >
                    <RefreshCw className="h-4 w-4"/></Button>
            </div>
        </div>
    )
}

export default WeatherDashboard;