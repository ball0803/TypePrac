import React from 'react'

const Keyset = () => {
    const allKey = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return (
        <div className="Indicator-keyset">All keys:
            {
                allKey.map((key) => {
                    return <span className='key'>{key}</span>
                })
            }
        </div>
    )
}

export default Keyset
