// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './routes/Home'
import GettingReady from './routes/GettingReady'
import Quiz from './routes/Quiz'

import './App.css'

const App = () => {
  const [quizPreferences, setQuizPreferences] = useState({
    category: 0,
    difficulty: 0,
    type: 0,
  })



  return (
    <BrowserRouter>
      <img className="fixed right-0 top-0 z-0" src='/tr-shape.png' alt="Shape Top" />
      <main className='w-full  flex align-middle justify-center  font text-custom-color font-karla-font py-6 px-3 z-10 scroll-my-10'>
        <section className='flex flex-col self-center w-fit h-auto justify-center max--width z-10 '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/getting-ready' element={<GettingReady setFormData={setQuizPreferences} />} />
            <Route path='/quiz' element={<Quiz formData={quizPreferences} />} />
          </Routes>
        </section>
      </main>
      <img className="fixed left-0 bottom-0 z-0" src='/bl-shape.png' alt="Shape Bottom" />
    </BrowserRouter>
  )
}

export default App
