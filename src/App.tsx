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
      <main className='w-full h-screen flex flex-col justify-center bg-custom-bg font text-custom-color font-karla-font'>
        <img className="fixed right-0 top-0" src='/tr-shape.png' alt="Shape Top" />
        <section className='flex flex-col self-center w-fit h-fit justify-center max--width'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/getting-ready' element={<GettingReady setFormData={setQuizPreferences} />} />
            <Route path='/quiz' element={<Quiz formData={quizPreferences} />} />
          </Routes>
        </section>
        <img className="fixed left-0 bottom-0" src='/bl-shape.png' alt="Shape Bottom" />
      </main>
    </BrowserRouter>
  )
}

export default App
