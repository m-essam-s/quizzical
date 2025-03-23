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
    amount: 0,
    type: 0,
  })

  return (
    <BrowserRouter>
      <img className="fixed right-0 top-0 z-0" src='/tr-shape.png' alt="Shape Top" />
      <main className='w-full h-screen flex flex-col justify-center items-center text-custom-color font-karla-font z-10 py-2'>
        <section className='flex flex-col justify-center z-10 overflow-y-auto'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/getting-ready'
              element={<GettingReady setFormData={setQuizPreferences} />}
            />
            <Route
              path='/quiz'
              element={<Quiz quizPreferences={quizPreferences} />}
            />
          </Routes>
        </section>
      </main>
      <img className="fixed left-0 bottom-0 z-0" src='/bl-shape.png' alt="Shape Bottom" />
    </BrowserRouter>
  )
}

export default App
