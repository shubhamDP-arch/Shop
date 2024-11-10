import BarcodeScanner from './pages/react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from './pages/login'

function App() {
  return(
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/scan' element={<BarcodeScanner/>}/>
          </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
