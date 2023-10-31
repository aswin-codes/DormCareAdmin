// frontend/src/components/LaundryForm.js
import React, { useState } from 'react';

const LaundryForm = () => {
  const [regNo, setRegNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [status, setStatus] = useState('GIVEN');
  const [clothes, setClothes] = useState([{ type: '', count: 0 }]);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const originalData = {
      reg_no: regNo,
      room_no: roomNo,
      status: status,
      clothes: clothes,
    };
    const transformedData = {
      ...originalData,
      clothes: originalData.clothes.reduce((acc, cloth) => {
        acc[cloth.type] = cloth.count;
        return acc;
      }, {})
    };

    console.log(transformedData);
    try {
      const response = await fetch('http://localhost:3000/laundry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });
  
      if (response.ok) {
        // The request was successful, you can perform additional actions here.
        setRegNo('');
        setRoomNo('');
        setStatus('')
        setClothes([{ type: '', count: 0 }]);
        console.log('Laundry Data saved successfully');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-4 border rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Registration Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Room Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Room Number"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="GIVEN">GIVEN</option>
            <option value="PROCESS">PROCESS</option>
            <option value="READY">READY</option>
          </select>
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Clothes:
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2"
            onClick={() => setClothes([...clothes, { type: '', count: 0 }])}
          >
            Add Clothing
          </button>
          {clothes.map((clothing, index) => (
            <div key={index} className="mb-2">
              <input
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Clothing Type"
                value={clothing.type}
                onChange={(e) => {
                  const updatedClothes = [...clothes];
                  updatedClothes[index].type = e.target.value;
                  setClothes(updatedClothes);
                }}
              />
              <input
                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Count"
                value={clothing.count}
                onChange={(e) => {
                  const updatedClothes = [...clothes];
                  updatedClothes[index].count = parseInt(e.target.value, 10);
                  setClothes(updatedClothes);
                }}
              />
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                onClick={() => {
                  const updatedClothes = [...clothes];
                  updatedClothes.splice(index, 1);
                  setClothes(updatedClothes);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LaundryForm;
