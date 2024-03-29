import React from 'react';
import './AmountInput.css'

export default function AmountInput(props) {
    const { label, type, onChange } = props
    return (
        <>
            <label htmlFor={ label }>{ label }</label>
            <input type={ type } placeholder={ label } required min={1} onChange={ onChange }></input>
        </>
    )
}

export { AmountInput }
