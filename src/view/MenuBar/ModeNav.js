import React, { useState } from 'react';
import MenuButton from './MenuButton';

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
        <div style={{flex:"1"}}>
            {/* <label>Select Mode: </label> */}
            <div>
                {/* <MenuButton label="Select"  style={getOptionStyle('select')} onClick={() => handleModeChange({ target: { value: 'select' } })}/>
                <MenuButton label = "Shape" style={getOptionStyle('shape')} onClick={() => handleModeChange({ target: { value: 'shape' } })} />
                <MenuButton label = "Link" style={getOptionStyle('link')} onClick={() => handleModeChange({ target: { value: 'link' } })} />
                <MenuButton label = "Move" style={getOptionStyle('move')} onClick={() => handleModeChange({ target: { value: 'move' } })} /> */}
            </div>

            <div>
                <MenuButton label="Mode"  style={getOptionStyle('mode')} onClick={() => handleModeChange({ target: { value: 'mode' } })}/>
                {/* <MenuButton label = "Hide Right Pane" style={getOptionStyle('hrp')} onClick={() => handleModeChange({ target: { value: 'hrp' } })} /> */}
            </div>

        </div>
    );
};

export default ModeSelector;
