import React from "react"
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import Navigation from './Components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Store from './Components/Pages/Store';
import { useDispatch } from "react-redux";
import { setBookData, setCatogaryFilterName, setAutherFilterName } from "./Redux/bookSlice";
import { useSelector } from 'react-redux'


function App() {

  const dispatch = useDispatch()
  const bookData = useSelector((state) => {
    return state.book.booksData
  })

  React.useEffect(() => {
    loadUserData();
  }, []);

  var catogarySet = []
  var authorSet = []


  if (bookData.length > 0) {
    bookData.forEach((book) => {
      book.categories.forEach((cat) => {
        if (!catogarySet.includes(cat) && cat !== "" && cat.length > 6) {
          catogarySet.push(cat)
        }
      })


      if (book.authors.length === 1) {
        if (!authorSet.includes(book.authors[0]) && book.authors[0] !== "" && book.authors[0].length > 6) {
          authorSet.push(book.authors[0])
        }
      }
    })
  }

  if (catogarySet.length > 0) {
    dispatch(setCatogaryFilterName(catogarySet))
  }

  if (authorSet.length > 0) {
    dispatch(setAutherFilterName(authorSet))
  }

  const loadUserData = async () => {
    return await axios.get("http://localhost:5000/books").then((responce) => dispatch(setBookData(responce.data))).catch((err) => { alert("Server Not Connected") })
  }

  return (
    <div className="App">
      <div className='headerMain'>
        <Header />
      </div>

      <div className='navigationmain displayFlexCenter' style={{ borderBottom: "1px solid #ffffff47" }}>
        <Navigation />
      </div>

      <div className='mainMain'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
