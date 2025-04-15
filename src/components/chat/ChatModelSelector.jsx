import { useState, useRef, useEffect, useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { getModels } from '../../services/chatService';
import { ChatContext } from '../../contexts/ChatContext';

function ChatModelSelector() {
    const { setModel: setContextModel, model: contextModel } = useContext(ChatContext);
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
        <div className="relative" ref={dropdownRef}>
            {/* Model Selector Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-30 px-4 py-2 text-primary-400 bg-transparent rounded-lg hover:bg-black-500 transition-colors"
            >
                <div className="flex items-center">
                    <span className="mr-2 capitalize font-bold">{contextModel ?? 'Select Model'}</span>
                </div>
                <FaChevronDown className={`w-3 h-3 mt-0.5 transition-transform text-slate-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu with Integrated Info */}
            {isDropdownOpen && (
                <div className="absolute z-30 mt-1 w-66 bg-black-700 border border-primary-500/20 rounded-md shadow-lg">
                    {currentModels.map((model, index) => (
                        <div
                            key={index}
                            className="border-b border-primary-500/10 last:border-0"
                        >
                            <div
                                className="flex flex-col px-4 py-2 hover:bg-black-600 cursor-pointer"
                                onClick={() => handleModelSelect(model.name)}
                            >
                                <span className={`capitalize ${contextModel === model.name ? 'text-primary-400' : 'text-slate-200'}`}>
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