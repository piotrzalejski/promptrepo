'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data[0].length > 0) {
      // console.log('postdata: ', data[0]);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const postData = data[0];

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
  const [posts, setPosts] = useState('');

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

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

      <PromptCardList data={[posts]} handleTagClick={() => {}} />
    </section>
  );
};
export default Feed;
