import React, { useState } from 'react';

const WarningAlert = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="flex items-center justify-between p-4 text-sm text-yellow-600 bg-yellow-100 rounded-xl" role='alert'>
            <span>{message}</span>

            <button 
                onClick={handleClose} 
                className="ml-4 text-yellow-600 hover:text-yellow-800" 
                aria-label='close'
            >
                {/* Close icon (X) */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    );
}

export default WarningAlert;