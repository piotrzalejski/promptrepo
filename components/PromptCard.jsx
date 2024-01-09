'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  const [copied, setCopied] = useState('');
  const [cardPost, setCardPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setCardPost(post);
      setLoading(false);
      //console.log('The card post is: ', post);
    } else {
      console.log('No information to display');
    }
  }, []);

  const handleCopy = () => {
    setCopied(cardPost.prompt);
    navigator.clipboard.writeText(cardPost.prompt);
    setTimeout(() => setCopied(''), 1000);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={cardPost.creator.image}
            width={40}
            height={40}
            alt='user image'
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-hsl0065'>
              {post?.creator.username}
            </h3>
            <p className='text-sm font-inter text-hsl0065/40'>
              {post?.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={20}
            height={20}
            alt='copy'
          />
        </div>
      </div>
      <pre className='overflow-auto whitespace-pre-line my-4 font-satoshi text-sm text-hsl0065/80'>
        {post?.prompt}
      </pre>
      <p
        className='text-hsl0065/40 font-inter text-sm cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post?.tag}
      </p>
    </div>
  );
};
export default PromptCard;
