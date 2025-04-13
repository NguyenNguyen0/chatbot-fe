import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';

function ChatModelSelector() {
    const [currentModel, setCurrentModel] = useState('llama3'); // Default model
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Available AI models
    const models = [
        { id: 'llama3', name: 'Llama 3', description: 'Open-source large language model by Meta AI.' },
        { id: 'claude', name: 'Claude', description: 'Anthropic\'s conversational AI assistant.' },
        { id: 'gpt4', name: 'GPT-4', description: 'OpenAI\'s most powerful language model with advanced reasoning.' },
        { id: 'mistral', name: 'Mistral', description: 'High-performance, lightweight language model.' },
    ];

    // Get the current model
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleModelSelect = (modelId) => {
        console.log(`Model selected: ${modelId}`);
        setCurrentModel(modelId);
        setIsDropdownOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Model Selector Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between min-w-30 px-4 py-2 text-secondary-200 bg-transparent rounded-lg hover:bg-primary-500 transition-colors"
            >
                <div className="flex items-center">
                    <span className="mr-2 text-xl capitalize font-bold">{currentModel ?? 'Select Model'}</span>
                </div>
                <FaChevronDown className={`transition-transform mt-1 text-secondary-100 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu with Integrated Info */}
            {isDropdownOpen && (
                <div className="absolute z-30 mt-1 w-66 bg-primary-700 border border-secondary-500/20 rounded-md shadow-lg">
                    {models.map(model => (
                        <div
                            key={model.id}
                            className="border-b border-secondary-500/10 last:border-0"
                        >
                            <div
                                className="flex flex-col px-4 py-2 hover:bg-primary-600 cursor-pointer"
                                onClick={() => handleModelSelect(model.id)}
                            >
                                <span className={`${currentModel === model.id ? 'text-secondary-500' : 'text-secondary-300'}`}>
                                    {model.name}
                                </span>
                                <span className='flex items-center justify-between gap-2 mt-1'>
                                    <span>
                                        <FaInfoCircle className='text-secondary-300 w-4 h-4' />
                                    </span>
                                    <p className='text-secondary-200 text-xs'>{model.description}</p>
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