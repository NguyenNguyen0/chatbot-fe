import { useState, useRef, useEffect, useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { getModels } from '../../services/chatService';
import { ChatContext } from '../../contexts/ChatContext';

function ChatModelSelector() {
    const { setModel: setContextModel } = useContext(ChatContext);
    const [currentModel, setCurrentModel] = useState(null);
    const [currentModels, setCurrentModels] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        getModels()
            .then(data => {
                setCurrentModels(data.models);
                setCurrentModel(data.models[0]?.name); // Set the first model as default
                setContextModel(data.models[0]?.name); // Set the model in context
            })
            .catch(error => {
                console.error('Error fetching models:', error);
            });
    }, [setContextModel]);

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
        setCurrentModel(modelName);
        setContextModel(modelName);
        setIsDropdownOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Model Selector Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-30 px-4 py-2 text-secondary-400 bg-transparent rounded-lg hover:bg-primary-500 transition-colors"
            >
                <div className="flex items-center">
                    <span className="mr-2 capitalize font-bold">{currentModel ?? 'Select Model'}</span>
                </div>
                <FaChevronDown className={`w-3 h-3 transition-transform text-secondary-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu with Integrated Info */}
            {isDropdownOpen && (
                <div className="absolute z-30 mt-1 w-66 bg-primary-700 border border-secondary-500/20 rounded-md shadow-lg">
                    {currentModels.map((model, index) => (
                        <div
                            key={index}
                            className="border-b border-secondary-500/10 last:border-0"
                        >
                            <div
                                className="flex flex-col px-4 py-2 hover:bg-primary-600 cursor-pointer"
                                onClick={() => handleModelSelect(model.name)}
                            >
                                <span className={`capitalize ${currentModel === model.name ? 'text-secondary-500' : 'text-secondary-300'}`}>
                                    {model.name}
                                </span>
                                <span className='flex items-center justify-between gap-2 mt-1'>
                                    {/* <span>
                                        <FaInfoCircle className='text-secondary-300 w-4 h-4' />
                                    </span> */}
                                    {/* <p className='text-secondary-200 text-xs'>{model?.description}</p> */}
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