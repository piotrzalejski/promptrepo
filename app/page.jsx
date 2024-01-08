import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Store & Share
        <br className='max-md:hidden' />
        <span className='greenblue_gradient text-center'>AI Prompts</span>
      </h1>
      <p className='desc text-center'>
        An AI prompting tool to discover,share and create prompts
      </p>
      <Feed />
    </section>
  );
};
export default Home;
