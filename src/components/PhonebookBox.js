import { useState, useEffect } from "react"
import PhonebookList from "./PhonebookList"
import PhonebookTopBar from "./PhonebookTopbar"

export default function PhonebookBox() {
  const [data, setData] = useState([]);  // To store the fetched data
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc'); 
  const [keyword, setKeyword] = useState('')
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);  // To handle errors

  useEffect(() => {
    fetch('http://localhost:3001/api/phonebooks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  
      })
      .then(data => {
        setData(data.phonebooks); 
        setTotalPage(data.pages)
        setLoading(false);  
      })
      .catch(error => {
        setError(error);  
        setLoading(false);  
      });
  }, []);  // Empty dependency array means this effect runs only once after the initial render

  const fetchPhonebookData = async (keyword, sort, page) => {
    setKeyword(keyword)
    const params = {
      keyword,
      sort,
      page
    }

    const queryString = new URLSearchParams(params).toString();

    // setLoading(true)
    try { 
      const response = await fetch(`http://localhost:3001/api/phonebooks?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();
      setData((prevData) => [...prevData, ...result.phonebooks]);
      setSort(sort)
      setTotalPage(result.pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const refreshPhonebookData = async (keyword, sort, page) => {
    setKeyword(keyword)
    const params = {
      keyword,
      sort,
      page
    }

    const queryString = new URLSearchParams(params).toString();

    try { 
      const response = await fetch(`http://localhost:3001/api/phonebooks?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.json();
      setData(result.phonebooks);
      setPage(1)
      setSort(sort)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const addPhonebook = async (name, phone) => {
    const newData = {
      name,
      phone
    };
    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
      refreshPhonebookData(keyword, 'asc', 1)
    } catch (error) {
      console.error("Error posting data:", error);
    }

  }

  const removePhonebook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data removed successfully:", result);
      refreshPhonebookData(keyword, 'asc', 1)
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const updatePhonebook = async (id, name, phone) => {
    const updateData = {
      name,
      phone
    };

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  const handleFileUpload = async (file, id) => {

    if (!file) {
      alert("Please select a file first");
      return;
    }

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append('avatar', file); // 'file' is the key used in the server

    try {
      const response = await fetch(`http://localhost:3001/api/phonebooks/${id}/avatar`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      fetchPhonebookData(keyword, 'asc', 1)
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
      if (page < totalPage){
        setPage((prevPage) => prevPage + 1); 
      }
    }
  };

  // Set up the event listener for scroll
  useEffect(() => {
    if (page > 1 && page <= totalPage) { // Prevent fetch on initial load
      fetchPhonebookData(keyword, sort, page);
    }
  }, [page, keyword, sort]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading, page, totalPage]);


  if (!loading) {
    return (
      <div className='container'>
        {/* <p style={{marginTop:"50px"}}>Page: {page}</p> */}
        {/* <p>Total Page: {totalPage}</p> */}
        <PhonebookTopBar search={refreshPhonebookData} add={addPhonebook} sort={sort}/>
        <div>
          {data ? <PhonebookList data={data} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} uploadAvatar={handleFileUpload} /> : ''}
        </div>
        {/* {data ? <p>Data: {JSON.stringify(data.phonebooks)}</p> : <p>Loading...</p>} */}
      </div>
    )
  }
}