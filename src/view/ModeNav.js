import React, { useState } from 'react';

const ModeSelector = ({ onModeChange }) => {
    const [mode, setMode] = useState('select');

    const handleModeChange = (event) => {
        const newMode = event.target.value;
        setMode(newMode);
        onModeChange(newMode);
    };

    const optionStyles = {
        display: 'inline-block',
        margin: '0 10px',
        padding: '10px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const selectedOptionStyles = {
        ...optionStyles,
        border: '2px solid #333',
        background: '#f0f0f0',
        fontWeight: 'bold',
    };

    const getOptionStyle = (value) => (value === mode ? selectedOptionStyles : optionStyles);

    return (
        <div>
            {/* <label>Select Mode: </label> */}
            <div>
                <div
                    style={getOptionStyle('select')}
                    onClick={() => handleModeChange({ target: { value: 'select' } })}
                >
                    Select
                </div>
                <div
                    style={getOptionStyle('shape')}
                    onClick={() => handleModeChange({ target: { value: 'shape' } })}
                >
                    Shape
                </div>
                <div
                    style={getOptionStyle('link')}
                    onClick={() => handleModeChange({ target: { value: 'link' } })}
                >
                    Link
                </div>
                <div
                    style={getOptionStyle('move')}
                    onClick={() => handleModeChange({ target: { value: 'move' } })}
                >
                    Move
                </div>
            </div>
        </div>
    );
};

export default ModeSelector;
