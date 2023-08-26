import "./app.css"
import DropdownProvider from "./components/DropdownProvider"

const dropdownOptions = [
  "Like",
  "Save",
  "Mute",
  "Block",
  "Report"
]

function App() {

  return (
    <div className="container">
      <DropdownProvider
        dropdownOptions={dropdownOptions}
      />
    </div>
  )
}

export default App