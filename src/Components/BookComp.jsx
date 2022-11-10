import React from 'react'

function BookComp({ book }) {
    return (
        <div style={{ margin: '5px', padding: '10px', width: '170px', height: "241px", textAlign: 'center', background: '#3a3a3a', borderRadius: "5px" }}>
            <img src={book.thumbnailUrl} alt={book.title} style={{ width: '150px', height: "188px" }} />
            <h6>{book.title}</h6>
        </div>
    )
}

export default BookComp