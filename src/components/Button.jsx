import React from 'react';

export function Button ({items, onClick}) {
    return (
        items.map((item) => 
            <div className={`button${item.index}`+' '+'button'} 
                 onClick={() => {
                    onClick(item)
                 }}
                 key={item.index}>
              {item.value}
            </div>
        )
    )
}