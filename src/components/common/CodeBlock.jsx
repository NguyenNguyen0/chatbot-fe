import propTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { GoCopy } from 'react-icons/go';
import { IoCheckmark } from 'react-icons/io5';
import { useState, useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

function CodeBlock({ className = '', children, ...props }) {
	const { getCurrentTheme } = useContext(ThemeContext);
	const [copiedCode, setCopiedCode] = useState(null);
	const codeString = String(children).trim();
	const language = className?.replace('language-', '') || 'javascript';
	const isCopied = copiedCode === codeString;

	const handleCopyCode = code => {
		navigator.clipboard.writeText(code);
		setCopiedCode(code);
		setTimeout(() => setCopiedCode(null), 2000);
	};

	const getCodeTheme = () => {
		const theme = getCurrentTheme();
		return theme === 'dark' ? darcula : oneLight;
	};

	return (
		<span className="relative block my-4 border border-gray-700 rounded-md overflow-hidden shadow-md">
			<span className="relative -mb-2 py-2 bg-slate-300 text-black-700 dark:bg-gray-800 dark:text-white p-2 shadow-md rounded-t-md rounded-b-md shadow-black-500/30 dark:shadow-black-500/20 border border-t-0 border-x-0 border-b-slate-700 w-full inline-block z-0">
				<span className="font-mono text-sm">{language}</span>
				<button
					onClick={() => handleCopyCode(codeString)}
					className="absolute top-2 right-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white p-1.5 rounded-md transition-colors"
					title={isCopied ? 'Copied!' : 'Copy to clipboard'}
				>
					{isCopied ? (
						<IoCheckmark className="w-4 h-4" />
					) : (
						<GoCopy className="w-4 h-4" />
					)}
				</button>
			</span>

			<SyntaxHighlighter
				className="custom-scrollbar"
				language={language}
				style={getCodeTheme()}
				customStyle={{
					padding: '1rem',
					margin: '',
					borderRadius: '0.5rem',
					fontSize: '0.875rem',
				}}
				codeTagProps={{
					style: { backgroundColor: 'transparent' },
				}}
				wrapLongLines
				{...props}
			>
				{codeString}
			</SyntaxHighlighter>
		</span>
	);
}

CodeBlock.propTypes = {
	codeString: propTypes.string.isRequired,
	isCopied: propTypes.bool.isRequired,
	onCopyCode: propTypes.func.isRequired,
	children: propTypes.node.isRequired,
	className: propTypes.string,
};

export default CodeBlock;
