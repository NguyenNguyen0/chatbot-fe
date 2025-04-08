import propsTypes from 'prop-types';

function Dialog({ isOpen, onClose, onConfirm, message, title }) {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative bg-white dark:bg-primary-600 rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

Dialog.propTypes = {
    isOpen: propsTypes.bool.isRequired,
    onClose: propsTypes.func.isRequired,
    onConfirm: propsTypes.func,
    message: propsTypes.node.isRequired,
    title: propsTypes.string.isRequired,
}

export default Dialog
