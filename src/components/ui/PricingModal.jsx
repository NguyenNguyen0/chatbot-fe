import propTypes from 'prop-types';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

function PricingModal({ isOpen, onClose }) {
	const [activeTab, setActiveTab] = useState('personal');

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black-400 dark:bg-black-700 bg-opacity-50 backdrop-blur-sm">
			<div className="relative w-[90%] max-w-6xl max-h-[90vh] overflow-auto bg-transparent rounded-xl p-6">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-200 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
				>
					<IoMdClose size={24} />
				</button>

				<h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary-300 to-primary-500 text-transparent bg-clip-text">
					Upgrade your plan
				</h2>

				{/* Tabs */}
				<div className="flex justify-center mb-6">
					<div className="bg-gray-200 dark:bg-black-600 p-1 rounded-full">
						<button
							className={`px-6 py-2 rounded-full ${
								activeTab === 'personal'
									? 'bg-white dark:bg-black-500 shadow-md'
									: 'text-gray-500 dark:text-gray-400'
							}`}
							onClick={() => setActiveTab('personal')}
						>
							Personal
						</button>
						<button
							className={`px-6 py-2 rounded-full ${
								activeTab === 'business'
									? 'bg-white dark:bg-black-500 shadow-md'
									: 'text-gray-500 dark:text-gray-400'
							}`}
							onClick={() => setActiveTab('business')}
						>
							Business
						</button>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Free Plan */}
					<div className="bg-white dark:bg-black-600 rounded-xl p-6 shadow-md border border-primary-200 dark:border-primary-900/20">
						<h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
							Free
						</h3>
						<div className="flex items-baseline mb-4">
							<span className="text-3xl font-bold text-primary-500">$0</span>
							<span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
							Experience AI support for your everyday tasks
						</p>
						<button className="w-full py-2 mb-6 rounded-lg bg-gray-200 dark:bg-black-500 text-gray-700 dark:text-gray-300 font-medium transition-all hover:bg-gray-300 dark:hover:bg-black-400">
							Your current plan
						</button>

						{/* Feature list */}
						<ul className="space-y-3">
							<FeatureItem text="Access to GPT-4o mini and reasoning features" />
							<FeatureItem text="Standard conversation mode" />
							<FeatureItem text="Real-time web data via search functionality" />
							<FeatureItem text="Limited access to GPT-4o and o4-mini" />
							<FeatureItem text="Limited access to file uploads, advanced data analysis, and image generation" />
							<FeatureItem text="Use of custom GPTs" />
						</ul>
					</div>

					{/* Plus Plan */}
					<div className="bg-white dark:bg-black-600 rounded-xl p-6 shadow-md border-2 border-primary-500 relative">
						<div className="absolute -top-3 right-4 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
							POPULAR
						</div>
						<h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
							Plus
						</h3>
						<div className="flex items-baseline mb-4">
							<span className="text-3xl font-bold text-primary-500">$20</span>
							<span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
							Enhance productivity and creativity with expanded access
						</p>
						<button className="w-full py-2 mb-6 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all">
							Upgrade to Plus
						</button>

						{/* Feature list */}
						<ul className="space-y-3">
							<FeatureItem text="All features in the Free plan" />
							<FeatureItem text="Expanded access to large document analysis, advanced data analysis, and image generation" />
							<FeatureItem text="Standard and advanced conversation modes" />
							<FeatureItem text="Access to in-depth research functionality, multiple reasoning models (o4-mini, o4-mini-high, and o3), and research previews of GPT-4.5" />
							<FeatureItem text="Create and use tasks, projects, and custom GPTs" />
							<FeatureItem text="Limited access to Sora video generation" />
							<FeatureItem text="Opportunity to try new features" />
						</ul>
					</div>

					{/* Pro Plan */}
					<div className="bg-white dark:bg-black-600 rounded-xl p-6 shadow-md border border-primary-200 dark:border-primary-900/20">
						<h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
							Pro
						</h3>
						<div className="flex items-baseline mb-4">
							<span className="text-3xl font-bold text-primary-500">$200</span>
							<span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
							Maximize OpenAI with the highest level of access
						</p>
						<button className="w-full py-2 mb-6 rounded-lg bg-white dark:bg-black-500 border border-primary-500 text-primary-500 font-medium transition-all hover:bg-primary-50 dark:hover:bg-black-400">
							Upgrade to Pro
						</button>

						{/* Feature list */}
						<ul className="space-y-3">
							<FeatureItem text="All features in the Plus plan" />
							<FeatureItem text="Unlimited access to all reasoning models and GPT-4o" />
							<FeatureItem text="Unlimited access to advanced conversation mode" />
							<FeatureItem text="Expanded access to in-depth research capabilities, performing multi-step online research for complex tasks" />
							<FeatureItem text="Access to research previews of GPT-4.5 and Operator" />
							<FeatureItem text="Access to o1 pro mode, a feature using greater computational capabilities to deliver the best answers to your most challenging questions" />
							<FeatureItem text="Expanded access to Sora video generation" />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

PricingModal.propTypes = {
	isOpen: propTypes.bool.isRequired,
	onClose: propTypes.func.isRequired,
};

// Helper component for feature items
function FeatureItem({ text }) {
	return (
		<li className="flex items-start">
			<span className="mr-2 mt-1 text-primary-500">
				<FaCheck size={14} />
			</span>
			<span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
		</li>
	);
}

FeatureItem.propTypes = {
	text: propTypes.string.isRequired,
};

export default PricingModal;
