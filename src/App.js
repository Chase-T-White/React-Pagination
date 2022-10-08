import { useState, useEffect } from "react";
import paginate from "./utils/paginate";
import Follower from "./components/Follower";

const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const gitData = await response.json();
      setData(paginate(gitData));
      setLoading(false);
    } catch (error) {
      console.error();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;
    return setFollowers(data[page]);
  }, [loading, page]);

  const handlePage = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  return (
    <main>
      <header className='title'>
        <div className='container flex fd-col'>
          <h1>{loading ? "Loading..." : "Pagination"}</h1>
          <div className='underline'></div>
        </div>
      </header>
      <section className='git-users'>
        <div className='container'>
          <div className='git-list'>
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />;
            })}
          </div>
          {!loading && (
            <div className='container flex btn-container'>
              <button className='pag-btn' onClick={() => prevPage()}>
                Prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`btn page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                    onClick={() => handlePage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button className='pag-btn' onClick={() => nextPage()}>
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
