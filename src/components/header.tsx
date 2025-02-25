import React from 'react';
import { useTheme } from '@/context/theme-provider.js';
import { Link } from 'react-router-dom';
import { Moon, Sun } from "lucide-react";
import { CitySearch } from './city-search.js';
const Header = () => { 
    const {theme, setTheme} = useTheme();
    const isDark = theme === "dark";

    return <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/65'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
            <Link to={'/'}>
            <img src={isDark ? "BB_Light_Logo.png" : "BB_Dark_Logo.png" } 
            alt="Breeze Beacon Logo" 
            className="h-14" />
            </Link>
            <div className='flex gap-4'>
                <CitySearch />
                <div
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className={`flex items-center cursor-pointer transition-transform duration-250 ${
                        isDark ? "rotate-180" : "rotate-0"
                    }`}
                    >
                    {isDark ? (
                        <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
                    ) : (
                        <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </div>
            </div>
        </div>
    </header>
};

export default Header;