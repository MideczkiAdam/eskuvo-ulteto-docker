import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ModalHost from "./components/ModalHost"
import { useModalContext } from "./context/ModalContextProvider"
import GuestsPage from "./pages/GuestsPage"
import Navbar from "./components/Navbar"

const App = () => {
  const {modalIsOpen} = useModalContext()
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guests" element={<GuestsPage />} />
        </Routes>
      </BrowserRouter>
      {modalIsOpen && <ModalHost />}
    </>
  )
}

export default App