import React from 'react';
import './AmountOutput.css'

export default function AmountOutput(props) {
    const { label, value } = props
    return (
        <div className='output-field'>
            <label htmlFor={ label }> { label }</label>
            <textarea id={label} placeholder={ label } rows={1} value={ value } readOnly></textarea>
        </div>
    )
}

export { AmountOutput }