import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url =
  'https://api-for-basic-projects.netlify.app/tours-project/tours_data.json';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const toursData = await response.json();
      setIsLoading(false);
      setTours(toursData);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  if (isLoading) {
    return (
      <main>
        <Loading />
        {/* <button onClick={handleToggle}>Toggle Loading</button> */}
      </main>
    );
  }
  if (!tours.length) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <>
      <Tours tours={tours} removeTour={removeTour} />
      {/* <button onClick={handleToggle}>Toggle Loading</button> */}
    </>
  );
}

export default App;
