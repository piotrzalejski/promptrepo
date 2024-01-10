'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length > 0) {
      // console.log('postdata: ', data[0]);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const postData = data;

  return (
    <div className='mt-16 prompt_layout'>
      {postData &&
        postData.length > 0 &&
        postData.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // smoother appearance with filtering
    setSearchTimeout(
      setTimeout(() => {
        const results = filterPrompts(e.target.value);
        setSearchResults(results);
      }, 300)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const results = filterPrompts(tag);
    setSearchResults(results);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input'
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};
export default Feed;
