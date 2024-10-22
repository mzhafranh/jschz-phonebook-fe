import { useState, useEffect } from "react"
import PhonebookList from "./PhonebookList"
import PhonebookTopBar from "./PhonebookTopbar"

export default function PhonebookBox() {
  const [data, setData] = useState([]);  // To store the fetched data
  const [sort, setSort] = useState('asc'); 
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);  // To handle errors

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:3001/api/phonebooks')  // Example API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response as JSON
      })
      .then(data => {
        setData(data);  // Update state with the fetched data
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(error => {
        setError(error);  // Handle errors by setting the error state
        setLoading(false);  // Also stop loading if there's an error
      });
  }, []);  // Empty dependency array means this effect runs only once after the initial render

  const fetchPhonebookData = async (keyword, sort) => {
    const params = {
      keyword,
      sort
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
      setData(result);
      setSort(sort)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      fetchPhonebookData('', 'asc')
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
      fetchPhonebookData('', 'asc')
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
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!loading) {
    return (
      <div className='container'>
        <PhonebookTopBar search={fetchPhonebookData} add={addPhonebook} sort={sort}/>
        <div>
          {data ? <PhonebookList data={data.phonebooks} removePhonebook={removePhonebook} updatePhonebook={updatePhonebook} uploadAvatar={handleFileUpload} /> : ''}
        </div>
        {/* {data ? <p>Data: {JSON.stringify(data.phonebooks)}</p> : <p>Loading...</p>} */}
      </div>
    )
  }
}