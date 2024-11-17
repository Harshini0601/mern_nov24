
import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState(""); // Restaurant name
  const [type, setType] = useState(""); // Restaurant type
  const [location, setLocation] = useState(""); // Restaurant location
  const [rating, setRating] = useState(""); // Restaurant rating
  const [topFood, setTopFood] = useState(""); // Top food
  const [foodList, setFoodList] = useState([]); // List of restaurants
  const [updates, setUpdates] = useState({}); // Store updates for individual rows

  // Fetch all restaurant data when the component mounts
  useEffect(() => {
    Axios.get("http://localhost:3005/read")
      .then((response) => {
        setFoodList(response.data); // Update foodList with data from backend
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add a new restaurant
  const addToList = () => {
    Axios.post("http://localhost:3005/insert", {
      name,
      type,
      location,
      rating,
      top_food: topFood,
    })
      .then(() => {
        setFoodList([...foodList, { name, type, location, rating, top_food: topFood }]); // Update state after adding
      })
      .catch((error) => console.error("Error adding restaurant:", error));
  };

  // Handle change in update fields
  const handleUpdateChange = (id, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Update a restaurant's details
  const updateFood = (id) => {
    const { name, top_food, rating } = updates[id] || {};
    Axios.put("http://localhost:3005/update", {
      id,
      newName: name,
      newTopFood: top_food,
      newRating: rating,
    })
      .then(() => {
        setFoodList(
          foodList.map((food) =>
            food._id === id
              ? { ...food, name: name || food.name, top_food: top_food || food.top_food, rating: rating || food.rating }
              : food
          )
        );
      })
      .catch((error) => console.error("Error updating restaurant:", error));
  };

  // Delete a restaurant
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3005/delete/${id}`)
      .then(() => {
        setFoodList(foodList.filter((food) => food._id !== id)); // Remove from state
      })
      .catch((error) => console.error("Error deleting restaurant:", error));
  };

  return (
    <div className="App container">
      <h1 className="text-center my-4">Restaurant Feedback System</h1>

      {/* Form to add a new restaurant */}
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="card p-4">
            <h3 className="text-center">Add Restaurant</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Top Food</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setTopFood(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={addToList}
              >
                Add to List
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Restaurant List Table */}
      <h2 className="text-center my-4">Restaurant List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Top Food</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.type}</td>
              <td>{val.location}</td>
              <td>{val.rating}</td>
              <td>{val.top_food}</td>
              <td>
                {/* Update Inputs */}
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="New name..."
                  value={updates[val._id]?.name || ""}
                  onChange={(e) => handleUpdateChange(val._id, "name", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="New top food..."
                  value={updates[val._id]?.top_food || ""}
                  onChange={(e) => handleUpdateChange(val._id, "top_food", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="New rating..."
                  value={updates[val._id]?.rating || ""}
                  onChange={(e) => handleUpdateChange(val._id, "rating", e.target.value)}
                />
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => updateFood(val._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFood(val._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
