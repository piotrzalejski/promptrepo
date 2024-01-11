import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const { data: session } = useSession();
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='bpr_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share killer prompts. Let your creativity loose on any
        AI-powered playground.
      </p>

      {session?.user ? (
        <form
          onSubmit={handleSubmit}
          className='mt-10 w-full max-w-2xl flex flex-col gap-7 form_'
        >
          <label htmlFor=''>
            <span className='font-satoshi font-semibold text-base'>
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder='Write your prompt here....'
              required
              className='form_textarea'
            />
          </label>
          <label htmlFor=''>
            <span className='font-satoshi font-semibold text-base'>
              Tag{' '}
              <span className='font-normal'>
                (#product, #webdevelopment, #idea)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder='#tag'
              required
              className='form_input'
            />
          </label>

          <div className='flex-end mx-3 gap-4'>
            <Link href='/' className='hover:text-grad-purple'>
              Cancel
            </Link>

            <button
              type='submit'
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-grad-purple rounded-full submit_btn'
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </section>
  );
};
export default Form;
