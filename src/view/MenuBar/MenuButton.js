import React, { useState } from 'react';

const MenuButton = (props) => {
    const [mode, setMode] = useState('select');

    const handleModeChange = (event) => {
        const newMode = event.target.value;
        setMode(newMode);
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
        <div
            style={props.style}
            onClick={() => props.onClick()}
        >
            {props.label}
        </div>
    );
};

export default MenuButton;
