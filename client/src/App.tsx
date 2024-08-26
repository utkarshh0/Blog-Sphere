import { BrowserRouter, Route, Routes } from "react-router-dom"
import Index from "./pages/Index"
import Blog from "./pages/Blog"
import Nav from "./Components/Nav"

const App : React.FC = () => {
  
  return(
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App