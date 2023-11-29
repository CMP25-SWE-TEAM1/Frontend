import React from 'react'

function Button({ name, classname}) {
    return (
        <button className={classname}>
            {name}
        </button>
    )
  }

export default Button