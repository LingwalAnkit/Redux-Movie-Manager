import { useDispatch, useSelector } from "react-redux";
// UseDispatch Used to send actions to Redux store
import { useState } from "react";
import { 
  addMovie, 
  removeMovie, 
  toggleWatched, 
  setFilter,
  selectFilteredMovies, 
  updateMovie
} from '../Features/Movies/MovieSlice';
import { nanoid } from "@reduxjs/toolkit";

const MoviesManager = () => {
  const dispatch = useDispatch();
  const filterMovies = useSelector(selectFilteredMovies);
  const currentFilter = useSelector((state) => state.movies.filter);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (movie) => {
      setEditingId(movie.id);
      setEditInput(movie.title);
  };

  const handleUpdate = () => {
      if (editInput.trim()) {
          dispatch(updateMovie({
              id: editingId,
              title: editInput
          }));
          setEditingId(null);
          setEditInput('');
      }
  };

  const handleAddMovie = () => {
      if (input.trim()) {
          const newMovie = {
              id: nanoid(),
              title: input,
              watched: false
          };
          dispatch(addMovie(newMovie));
          setInput('');
      }
  };

  return (
    <div className="p-20">
      <div className="flex items-center gap-2 justify-center mb-32 space-x-4">
        <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-xl border-2 rounded-xl p-2" 
            placeholder="Add new movie..."
        />
        <button 
            onClick={handleAddMovie}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
            Add Movie
        </button>
        <select 
          value={currentFilter} 
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="all">All</option>
          <option value="watched">Watched</option>
          <option value="unwatched">Unwatched</option>
        </select>
      </div>

      <ul className="space-y-2">
        {filterMovies.map(movie => (
          <li key={movie.id} className="flex items-center space-x-4 p-2 border rounded-2xl">
              {editingId === movie.id ? (
                  <div className="flex-grow flex space-x-2">
                      <input
                          type="text"
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          className="flex-grow border rounded p-1"
                      />
                      <button 
                          onClick={handleUpdate}
                          className="px-3 py-1 rounded-2xl bg-green-500 text-white  hover:bg-green-600"
                      >
                          Save
                      </button>
                      <button 
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-500 text-white rounded-2xl hover:bg-gray-600"
                      >
                          Cancel
                      </button>
                  </div>
              ) : (
                  <>
                      <span className="flex-grow">{movie.title}</span>
                      <button 
                          onClick={() => handleEdit(movie)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
                      >
                          Edit
                      </button>
                  </>
              )}
              <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={movie.watched}
                    onChange={() => dispatch(toggleWatched(movie.id))}
                    className="form-checkbox"
                  />
                  <span>Watched</span>
              </label>
              <button 
                onClick={() => dispatch(removeMovie(movie.id))}
                className="px-3 py-1 bg-red-500 text-white rounded-2xl hover:bg-red-600"
              >
                Remove
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesManager;