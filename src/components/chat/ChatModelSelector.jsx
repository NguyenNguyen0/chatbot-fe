import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { getModels } from '../../services/chatService';
import { useChat } from '../../hooks/useChat';

function ChatModelSelector() {
    const { changeModel: setContextModel, model: contextModel } = useChat();
    const [currentModels, setCurrentModels] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        getModels()
            .then(data => {
                setCurrentModels(data.models);
                setContextModel(data.models.at(-1)?.name);
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleModelSelect = (modelName) => {
        setContextModel(modelName);
        setIsDropdownOpen(false);
    }

    return (
        <div className="relative transition-transform duration-300 transform" ref={dropdownRef}>
            {/* Model Selector Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-30 px-4 py-2 text-black-500 dark:text-white bg-transparent rounded-lg dark:hover:bg-black-500 transition-colors"
            >
                <div className="flex items-center">
                    <span className="mr-2 capitalize font-bold">{contextModel ?? 'Select Model'}</span>
                </div>
                <FaChevronDown className={`w-3 h-3 mt-0.5 transition-transform text-black-500 dark:text-slate-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu with Integrated Info */}
            {isDropdownOpen && (
                <div className="absolute z-30 mt-1 w-66 border-black-200 bg-slate-100 dark:bg-black-700 border dark:border-slate-500/20 rounded-md shadow-lg">
                    {currentModels.map((model, index) => (
                        <div
                            key={index}
                            className="border-b border-black-200 dark:border-primary-500/10 last:border-0"
                        >
                            <div
                                className={`flex flex-col px-4 py-4 hover:bg-slate-200 dark:hover:bg-black-600 cursor-pointer capitalize ${contextModel === model.name ? 'font-bold dark:text-white dark:bg-black-600' : 'text-black-500 dark:text-slate-200'}`}
                                onClick={() => handleModelSelect(model.name)}
                            >
                                <span>
                                    {model.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatModelSelector;