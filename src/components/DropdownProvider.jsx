import OutsideClickHandler from "react-outside-click-handler"
import { useWindowWidth } from "../hooks/useWindowWidth"
import { useState } from "react"
import Dropdown from "./Dropdown"

const ProviderComponent = ({ toggleDropdown }) => {

  return (
    <button
      className="dropdown-cta"
      onClick={toggleDropdown}
    >
      Dropdown
    </button>
  )
}

const DropdownProvider = (props) => {
  const { windowWidth } = useWindowWidth()
  const [isActive, setIsActive] = useState(() => false)

  function toggleDropdown() {
    setIsActive(prevState => !prevState)
  }

  return (
    windowWidth <= 767 ?
      <>
        <ProviderComponent
          toggleDropdown={toggleDropdown}
        />
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          {...props}
        />
      </>
      :
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsActive(false)
        }}
      >
        <div
          className="dropdown-container"
        >
          <ProviderComponent
            toggleDropdown={toggleDropdown}
          />
          <Dropdown
            isActive={isActive}
            setIsActive={setIsActive}
            {...props}
          />
        </div>
      </OutsideClickHandler>
  )
}

export default DropdownProvider