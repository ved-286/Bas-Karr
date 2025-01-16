import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
     <div>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div className='sticky bottom-0'>
        <Footer />
      </div>
     </div>
    </>
  )
}

export default App
