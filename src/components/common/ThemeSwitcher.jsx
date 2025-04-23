import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoMdLaptop } from 'react-icons/io';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeToggle = () => {
        // Cycle through themes: light → dark → system → light
        switch (theme) {
            case 'light':
                setTheme('dark');
                break;
            case 'dark':
                setTheme('system');
                break;
            case 'system':
            default:
                setTheme('light');
                break;
        }
    };

    // Function to determine which icon to show
    const renderThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <FiSun className="w-5 h-5" />;
            case 'dark':
                return <FiMoon className="w-5 h-5" />;
            case 'system':
                return <IoMdLaptop className="w-5 h-5" />;
            default:
                return <FiSun className="w-5 h-5" />;
        }
    };

    // Function to determine the tooltip text
    const getTooltipText = () => {
        switch (theme) {
            case 'light':
                return 'Switch to Dark Mode';
            case 'dark':
                return 'Switch to System Mode';
            case 'system':
                return 'Switch to Light Mode';
            default:
                return 'Toggle Theme';
        }
    };

    return (
        <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full text-slate-100 hover:bg-white hover:text-gray-600 dark:hover:text-white dark:hover:bg-gray-500 transition-colors duration-200 cursor-pointer"
            title={getTooltipText()}
            aria-label={getTooltipText()}
        >
            {renderThemeIcon()}
        </button>
    );
};

export default ThemeSwitcher;