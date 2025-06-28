import Chatbot from "./components/chatbot"
import Sidebar from "./components/sidebar"
import "./App.css"
function App() {
  return (
    <div className="App">
      <Sidebar />
      <Chatbot />
    </div>
  )
}

export default App