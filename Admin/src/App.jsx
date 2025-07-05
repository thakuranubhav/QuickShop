import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/sidebar'
import Admin from './pages/Admin/Admin'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App