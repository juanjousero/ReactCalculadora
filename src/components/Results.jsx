import React from 'react';

export function Results ({selection, setSelection}) {
    let value = [];
    if (typeof(selection) === typeof({})) {
        selection.map((element) => {
            if (element.value == '+/-') {
                element.value = '-';
                value.push(element.value);
                element.value = '+/-'
            } else {
                value.push(element.value);
            }
        })
    } else {
        value = selection;
        setSelection([{value}]);
        console.log(selection);
    }

    return (
        <div className='result'>
            <h1>{value}</h1>
        </div> 
    )
}