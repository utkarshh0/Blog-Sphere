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
          <Route path="/api/v1/user" element={<Index />} />
          <Route path="api/v1/user/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App