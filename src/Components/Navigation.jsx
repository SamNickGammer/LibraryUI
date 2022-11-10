import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    const [showPage, setShowPage] = React.useState("")
    const [inc, setInc] = React.useState(0);
    React.useEffect(() => {
        setShowPage(window.location.pathname)
    }, [inc])
    return (
        <div className='displayFlexCenter menuManeger'>
            <Link to="/" onClick={() => { setInc(inc + 1) }} style={{ background: showPage === "/" ? "#fff" : "", color: showPage === "/" ? "#000" : "" }} className="listItemMenu"><div>Home</div></Link>
            <Link to="/store" onClick={() => { setInc(inc + 1) }} style={{ background: showPage === "/store" ? "#fff" : "", color: showPage === "/store" ? "#000" : "" }} className="listItemMenu"><div>Store</div></Link>
            {/* <Link to="/about" onClick={() => { setInc(inc + 1) }} style={{ background: showPage === "/about" ? "#fff" : "", color: showPage === "/about" ? "#000" : "" }} className='listItemMenu'><div>About</div></Link>
            <Link to="/contact" onClick={() => { setInc(inc + 1) }} style={{ background: showPage === "/contact" ? "#fff" : "", color: showPage === "/contact" ? "#000" : "" }} className='listItemMenu'><div>Contact</div></Link> */}
        </div>

    )
}

export default Navigation