
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/bug' element={<BugIndex />} />
            <Route path='/bug/:bugId' element={<BugDetails />} />
            <Route path='/about' element={<AboutUs />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
