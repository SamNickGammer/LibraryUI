import React from 'react'
import { useSelector } from 'react-redux'
import BookComp from '../BookComp'
import { useDispatch } from 'react-redux'
import axios from "axios";
import { setBookData } from "../../Redux/bookSlice";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function Store() {
    const dispatch = useDispatch()
    const [sideBarOpen, setSideBarOpen] = React.useState(false)
    const [fromDate, setFromDate] = React.useState("")
    const [toDate, setToDate] = React.useState("")

    var noOfPage = [];
    const [currentPage, setCurrentPage] = React.useState(1);
    const bookData = useSelector((state) => {
        return state.book.booksData
    })

    const catogaryName = useSelector((state) => {
        return state.book.catogaryName
    })

    const authorName = useSelector((state) => {
        return state.book.autherName
    })

    const [cat, setCat] = React.useState(catogaryName)
    const [auth, setAuth] = React.useState(authorName)

    const pagination = (pageNo, book) => {
        var i = pageNo * 32
        return book.slice(i - 32, i)
    }

    if (bookData.length > 0) {
        for (let i = 1; i <= Math.ceil(bookData.length / 32); i++) {
            noOfPage.push(i)
        }
    }


    const catogaryFilter = async (catogary) => {
        if (catogary === "All") {
            console.log("all", catogary);
            return await axios.get(`http://localhost:5000/books`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
        } else {
            console.log("else", catogary.toUpperCase());
            return await axios.get(`http://localhost:5000/books?categories=${catogary}`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
        }
    }

    const authorFilter = async (author) => {
        if (author === "All") {
            return await axios.get(`http://localhost:5000/books`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
        } else {
            return await axios.get(`http://localhost:5000/books?authors=${author}`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
        }
    }


    const dateFilter = async () => {
        if (fromDate === "" || toDate === "") {
            return await axios.get(`http://localhost:5000/books`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
        } else {
            var dt = []
            bookData.forEach((books) => {
                if (new Date(books.publishedDate.date) >= new Date(fromDate) && new Date(books.publishedDate.date) <= new Date(toDate)) {
                    dt.push(books)
                }
            })
            dispatch(setBookData(dt))
        }
    }


    return (
        <div style={{ padding: '10px', display: "flex" }}>
            <div style={{ marginRight: "15px", width: "20rem" }}>
                <h4 style={{ marginBottom: "10px" }}>Category</h4>
                <div className='catItem' onClick={() => { catogaryFilter("All") }}>All</div>
                {cat.map((catogary, index) => {
                    return <div key={index} className="catItem" onClick={() => { catogaryFilter(catogary) }}>{catogary}</div>
                })}
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <h4 style={{ marginBottom: "10px" }} className="displayFlexSpaceBetweem">
                    <span>
                        Books <span>{bookData.length}</span>
                    </span>
                    <span style={{ marginRight: "10px" }} className="filterBtn" onClick={() => { setSideBarOpen(true) }}>
                        <FilterListRoundedIcon />
                    </span>
                </h4>
                <div className='bookListsScroll' style={{ display: 'flex', flexWrap: "wrap", width: '100%', gap: "20px" }}>
                    {

                        pagination(currentPage, bookData).map((book, index) => {
                            return <BookComp key={index} book={book} />
                        })

                    }
                </div>
                <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: '5px' }}>
                    {
                        noOfPage.map((pageNo, index) => {
                            return <button key={index} onClick={() => { setCurrentPage(pageNo) }} className="peginationList" style={{ background: pageNo === currentPage ? "#fff" : "", color: pageNo === currentPage ? "#000" : "#fff" }}>{pageNo}</button>
                        })
                    }
                </div>
            </div>

            <div className='sideFilterBar' style={{ padding: "20px", display: sideBarOpen ? "block" : "none" }}>
                <div className='displayFlexSpaceBetweem'>
                    <h2>Filter</h2>
                    <h3 className='displayFlexCenter crossBtn' onClick={() => { setSideBarOpen(false) }}><CloseIcon /></h3>
                </div>
                <hr style={{ marginTop: "15px", marginBottom: "15px", borderColor: "rgb(191 191 191 / 40%)" }} />
                <div>
                    <h4 style={{ marginBottom: "10px" }}>Date</h4>
                    <div className='displayFlexSpaceBetweem'>
                        <div>
                            <span style={{ marginRight: "10px" }}>From</span>
                            <input type="date" onInput={(e) => { setFromDate(e.currentTarget.value) }} className='from' />
                        </div>
                        <div>
                            <span style={{ marginRight: "10px" }}>To</span>
                            <input type="date" onInput={(e) => { setToDate(e.currentTarget.value) }} className='to' />
                        </div>
                        <div>
                            <button className='filterBtn' onClick={dateFilter}><SearchIcon /></button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: "10px" }}>Author</h4>
                    <div className='catItem' onClick={() => { authorFilter("All") }}>All</div>
                    {auth.map((author, index) => {
                        return <div key={index} className="catItem" onClick={() => { authorFilter(author) }}>{author}</div>
                    })}
                </div>
            </div>
        </div >
    )
}

export default Store