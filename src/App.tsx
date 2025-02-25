import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { ThemeProvider } from './context/theme-provider.js'
import Layout from './components/layout.js'
import WeatherDashboard from './pages/weather-dashboard.js'
import CityPage from './pages/city-page.js'
import { Toaster } from './components/ui/sonner.js'

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider defaultTheme='dark'>
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </Layout>
        <Toaster richColors/>
      </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
