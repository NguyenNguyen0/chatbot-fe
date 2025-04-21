import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext();

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) return storedTheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
    }
    return 'light'
}

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme)
    const [systemTheme, setSystemTheme] = useState(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e) => {
            const newSystemTheme = e.matches ? 'dark' : 'light'
            setSystemTheme(newSystemTheme)

            if (theme === 'system') {
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(newSystemTheme)
            }
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            root.classList.add(prefersDark ? 'dark' : 'light')
        } else {
            root.classList.add(theme)
        }

        localStorage.setItem('theme', theme)
    }, [theme])

    const handleSetTheme = (newTheme) => {
        setTheme(newTheme)
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme: handleSetTheme,
            systemTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { ThemeContext, ThemeProvider };