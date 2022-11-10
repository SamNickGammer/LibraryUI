import React from 'react'
import { useDispatch } from 'react-redux'
import axios from "axios";
import { setBookData } from "../Redux/bookSlice";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100vw",
    height: '100vh',
    bgcolor: 'background.paper',
    // boxShadow: 24,
    p: 4,
    color: "#fff",
    background: "rgba( 255, 255, 255, 0.2 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    outline: 'none'
};


function Header() {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = React.useState("")

    const [openModalSearch, setOpenModalSearch] = React.useState(false);

    const loadUserData = async () => {
        return await axios.get(`http://localhost:5000/books?q=${searchValue}`).then((responce) => { dispatch(setBookData(responce.data)) }).catch((err) => { alert("Server Not Connected") })
    }
    React.useEffect(() => {
        loadUserData()
    }, [searchValue])

    return (
        <div className='displayFlexSpaceBetweem' style={{ padding: '10px' }}>
            <div>
                <h1 className='headingLogoheader'>Book Store</h1>
            </div>
            <div style={{ width: "50rem" }} className="searchBar">
                <div className="search-box">
                    <div className="search-input">
                        <input type="search" placeholder="Search Books, Publications" onInput={(e) => { setSearchValue(e.currentTarget.value) }} value={searchValue} />
                    </div>
                </div>
            </div>
            <div className='acccoutnLogin'>login</div>
            <div className='mobileSetting'>
                <div style={{ marginRight: '10px' }} onClick={() => { setOpenModalSearch(true) }}><SearchRoundedIcon /></div>
                <div><MenuRoundedIcon /></div>
            </div>
            <Modal
                open={openModalSearch}
                onClose={() => { setOpenModalSearch(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                </Box>
            </Modal>
        </div>
    )
}

export default Header