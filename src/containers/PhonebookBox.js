import {  useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import PhonebookList from "../components/PhonebookList"
import PhonebookTopBar from "./PhonebookTopbar"
import { fetchPhonebookData, setPage, setLoading, refreshPhonebookData, removePhonebook, updatePhonebook, handleFileUpload, addPhonebook } from '../actions';

export default function PhonebookBox() {

  const { phonebooks, page, loading, totalPage, keyword, sort, error } = useSelector((state) => state.phonebooks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page <= totalPage && !loading) {
      dispatch(setLoading(true));
      fetch(`http://localhost:3001/api/phonebooks?page=${page}`)
        .then(response => response.json())
        .then(data => {
          dispatch(fetchPhonebookData(keyword, sort, page));
          dispatch(setLoading(false));
        });
    }
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
      if (page < totalPage){
        dispatch(setPage(page + 1));
      }
    }
  };

  // Set up the event listener for scroll
  useEffect(() => {
    if (page > 1 && page <= totalPage) { // Prevent fetch on initial load
      dispatch(fetchPhonebookData(keyword, sort, page));
    }
  }, [page, keyword, sort]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading, page, totalPage]);


  if (!loading) {
    return (
      <div className='container'>
        <p style={{marginTop:"50px"}}>Page: {page}</p>
        <p>Total Page: {totalPage}</p>
        <PhonebookTopBar search={refreshPhonebookData} add={addPhonebook} sort={sort} keyword={keyword}/>
        <div>
          {phonebooks ? <PhonebookList data={phonebooks} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} uploadAvatar={handleFileUpload} keyword={keyword} sort={sort}/> : ''}
        </div>
        {/* {data ? <p>Data: {JSON.stringify(data.phonebooks)}</p> : <p>Loading...</p>} */}
      </div>
    )
  }
}