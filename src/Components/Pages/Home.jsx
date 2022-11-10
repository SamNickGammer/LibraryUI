import React from 'react'
import { useNavigate } from 'react-router-dom'
import { books } from "../../Data/books"

function Home() {
    const navigate = useNavigate()
    return (
        <div style={{ padding: '10px', display: "flex", flexWrap: 'wrap', gap: "10px", }}>
            {
                books.map((book) => {
                    return (
                        <div key={book.isbn} className="mainPageThm">
                            <img src={book.thumbnailUrl} alt={book.title} style={{ width: '150px', height: "188px" }} />
                            <div className='bookCardTitle'>{book.title}</div>
                        </div>
                    )
                })
            }
            <div className="mainPageThm" style={{ userSelect: "none", cursor: "pointer" }} onClick={() => { navigate("/store") }}>
                Click to see more
            </div>

        </div>
    )
}

export default Home