import  { useState, useEffect } from 'react';
import PostItem from './components/PostItem';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${page}`);
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h1>React Pagination App</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}

      <div id="btn-holder">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span> Page {page} </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default App;

