import '@styles/global.css';

import Nav from '@components/Nav';

export const metadata = {
  title: 'PromptRepo',
  description: 'Store and Share AI prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'></div>
        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};
export default RootLayout;
