import scrumdiddly from './scrumdiddly.png'

function MainPage() {
  return (
      <div className='center page-wrap'>
        <div className='bg-img'>
          <img src={scrumdiddly} className='logo' />
          <p className="lead mb-4">
            The premiere solution for making dinner at home easier!
          </p>
        </div>
      </div>
  );
}

export default MainPage;
