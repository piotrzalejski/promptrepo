'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { basePath } from '@next.config';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //TODO Finish setting up providers for signing in and out
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='PromptRepo Logo'
          width={60}
          height={60}
          className='object-contain'
        />
        <p className='logo_text'>PromptRepo</p>
      </Link>

      {/* Desktop Nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='createPost_btn'>
              Create Post
            </Link>
            <button
              type='button'
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/' });
              }}
              className='signOut_btn'
              href='/'
            >
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={35}
                height={35}
                alt='profile icon'
                onClick={() => setToggleDropdown((prev) => !prev)}
                style={{ borderRadius: '2rem' }}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='signIn_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={35}
              height={35}
              alt='profile icon'
              onClick={() => setToggleDropdown((prev) => !prev)}
              style={{ borderRadius: '2rem' }}
            />

            {toggleDropdown && (
              <div className='dropdown_mobile'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: '/' });
                  }}
                  className='mt-5 w-full signOut_btn mobile'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='signIn_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
