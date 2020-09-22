import React, { Fragment } from 'react';

const Loading = () => {
    return (
        <Fragment>
            <div className='bg fullscreen'></div>
            <div className='smoke'>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
            <div className='loader'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
          
         
        </Fragment>
    )
}

export default Loading;