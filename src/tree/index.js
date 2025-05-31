import React from 'react';
import './index.css'

export default function Tree() {
    return (
      <div className="tree">
        mammals<br/>
        <div className="one-indent">
          cheetah
        </div>
        <div className="one-indent">
          bear
        </div>
        <div className="two-indent">
          lion
        </div>
        <div className="two-indent">
          dog
        </div>
        <div className="three-indent">
          elephant
        </div>
        <div className="one-indent">
          ape
        </div>
      </div>
    )
}