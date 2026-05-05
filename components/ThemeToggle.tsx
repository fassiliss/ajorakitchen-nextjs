'use client';

import { useEffect, useSyncExternalStore } from 'react';

const themeChangeEvent = 'ajora-theme-change';

function getDarkModeSnapshot() {
    if (typeof window === 'undefined') return false;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
}

function subscribeToThemeChanges(onStoreChange: () => void) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    window.addEventListener('storage', onStoreChange);
    window.addEventListener(themeChangeEvent, onStoreChange);
    mediaQuery.addEventListener('change', onStoreChange);

    return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener(themeChangeEvent, onStoreChange);
        mediaQuery.removeEventListener('change', onStoreChange);
    };
}

export default function ThemeToggle() {
    const darkMode = useSyncExternalStore(
        subscribeToThemeChanges,
        getDarkModeSnapshot,
        () => false,
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        localStorage.setItem('theme', darkMode ? 'light' : 'dark');
        window.dispatchEvent(new Event(themeChangeEvent));
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <span className="text-xl">☀️</span>
            ) : (
                <span className="text-xl">🌙</span>
            )}
        </button>
    );
}
