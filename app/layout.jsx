import '@styles/global.css';

import Nav from '@components/Nav';

export const metadata = {
  title: 'PromptRepo',
  description: 'Store and Share AI prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='eng'>
      <body>
        <div className='main'>
          <div className='gradient'></div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
