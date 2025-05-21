import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { GoCopy } from 'react-icons/go';
import { IoCheckmark } from 'react-icons/io5';

import UtilButton from './UtilButton';

function CopyUtilButton({ content, ...props }) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		let timeout;
		if (isCopied) {
			timeout = setTimeout(() => {
				setIsCopied(false);
			}, 4000);
		}
		return () => clearTimeout(timeout);
	}, [isCopied]);

	const handleCopyMessage = content => {
		navigator.clipboard
			.writeText(content)
			.then(() => {
				setIsCopied(true);
			})
			.catch(err => {
				console.error('Failed to copy message: ', err);
			});
	};

	return (
		<UtilButton
			onClick={() => handleCopyMessage(content)}
			icon={isCopied ? <IoCheckmark className="w-4 h-4" /> : <GoCopy className="w-4 h-4" />}
			title={isCopied ? 'Copied!' : 'Copy'}
			{...props}
		/>
	);
}

CopyUtilButton.propTypes = {
	content: PropTypes.string.isRequired,
};

export default CopyUtilButton;
