import './App.scss';
import Automatic from './Automatic/Automatic';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className='main1 flex flex-col items-center h-screen background'>
      <div className='main2 w-full space-y-5 mt-10'>
        <Automatic/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
