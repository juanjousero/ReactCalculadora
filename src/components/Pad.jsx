import React from 'react';
import { Button } from './Button.jsx';

export function Pad ({items, onClick}) {
    return (
        <div className='pad'>
            <Button items={items}
                    onClick={onClick}/>
        </div>
    )
}