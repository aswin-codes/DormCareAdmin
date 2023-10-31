import React, { useState, useEffect } from "react";

function LaundryList() {
  const [laundryData, setLaundryData] = useState([]);
  const [myData, setMyData] = useState([]);
  
  useEffect(()=>{
    setMyData(laundryData)
  },[laundryData])

  useEffect(() => {
    // Fetch laundry data from your backend API and set it to the laundryData state.
    // Example:
    fetchLaundryData();
  }, []);

  const fetchLaundryData = async () => {
    try {
      const response = await fetch("http://localhost:3000/laundry");
      if (response.ok) {
        const data = await response.json();
        setLaundryData(data);
      } else {
        console.error("Failed to fetch laundry data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching laundry data:", error);
    }
  }

  const handleStatusChange = async (event, laundry) => {
    const newStatus = event.target.value;

    try {
      console.log(laundry)
      const response = await fetch(`http://localhost:3000/laundry/${laundry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus,room_no:laundry.room_no, reg_no:laundry.reg_no, clothes:laundry.clothes }),
      });

      if (response.ok) {
        // Refresh the laundry data after a successful update
        fetchLaundryData();
      } else {
        console.error("Failed to update status:", response.status);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  const handleSearch = (e) => {
    // Filter the laundryData based on the search term
    const filteredData = laundryData.filter((laundry) =>
      laundry.reg_no.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMyData(filteredData);
  }

  const handleDelete = async (laundry) => {
    await fetch(`http://localhost:3000/laundry/${laundry.id}`,{method: 'DELETE'});
    fetchLaundryData();
  }

  return (
    <div className="m-4 p-4 border border-gray-300 rounded shadow">
      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold mb-4">Laundry Data</h2>
        <input
        onChange={handleSearch}
          placeholder="Search"
          className="text-sm active:outline-none border border-gray-300 p-2 rounded-lg"
        />
      </div>
      <ul>
        {myData.map((laundry) => (
          <li
            key={laundry.id}
            className="py-2 flex justify-between bg-slate-400 rounded-lg m-4 p-2"
          >
            {laundry.reg_no}
            <select
              id="status"
              value={laundry.status}
              onChange={(event) => handleStatusChange(event, laundry)}
            >
              <option value="GIVEN">GIVEN</option>
              <option value="PROCESS">PROCESS</option>
              <option value="READY">READY</option>
            </select>
            <div>{laundry.room_no}</div>
            <div onClick={() => handleDelete(laundry)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LaundryList;
