import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home-page/HomePage"
import WorkflowPage from "./pages/workflow/Workflow"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
