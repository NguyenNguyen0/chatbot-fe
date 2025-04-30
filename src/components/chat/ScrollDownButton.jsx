import propTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { FaArrowDown } from "react-icons/fa6";

function ScrollDownButton({ containerRef, threshold = 200, className, ...props }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = useCallback(() => {
        if (!containerRef || !containerRef.current) return;

        const container = containerRef.current;
        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        setIsVisible(distanceFromBottom > threshold);
    }, [containerRef, threshold]);

    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        
        handleScroll();
        
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef, handleScroll]);

    const scrollToBottom = () => {
        if (!containerRef || !containerRef.current) return;

        const container = containerRef.current;
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToBottom}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
            className={`absolute bottom-40 z-5 p-3 bg-slate-400 hover:bg-slate-600 dark:bg-black-600 dark:hover:bg-black-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 cursor-pointer ${className}`}
            title='Scroll to bottom '
            {...props}
        >
            <FaArrowDown className="h-4 w-4" />
        </button>
    );
}

ScrollDownButton.propTypes = {
    containerRef: propTypes.shape({
        current: propTypes.instanceOf(Element)
    }).isRequired,
    threshold: propTypes.number,
    className: propTypes.string
};

export default ScrollDownButton;