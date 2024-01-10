'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (post) {
      setLoading(false);
      //console.log('The card post is: ', post);
    } else {
      console.log('No information to display');
    }
  }, []);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
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
            src={post.creator.image}
            width={40}
            height={40}
            alt='user image'
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-hsl0065'>
              {post.creator.username}
            </h3>
            <p className='text-sm font-inter text-hsl0065/40'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
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
        {post.prompt}
      </pre>
      <p
        className='text-hsl0065/40 font-inter text-sm cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-hsl0065/10 pt-3 '>
          <p
            className='font-inter text-sm text-grad-blue hover:text-grad-blue/50 cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm text-grad-red hover:text-grad-red/50 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default PromptCard;
