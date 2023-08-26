import { createPortal } from "react-dom"
import { useWindowWidth } from "../hooks/useWindowWidth"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "tween"
    }
  },
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.2,
      type: "tween"
    }
  }
}

const DropdownComponent = (props) => {
  const dropdownRef = useRef(null)
  const { windowWidth } = useWindowWidth()

  useEffect(() => {
    function handleDropPosition() {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const { bottom } = dropdownRect
      if (bottom > window.innerHeight) {
        dropdownRef.current.classList.add("drop-upwards")
      } else {
        dropdownRef.current.classList.remove("drop-upwards")
      }
    }

    if (props?.isActive && windowWidth > 767) {
      handleDropPosition()
    }
  }, [props?.isActive])

  function handleClose(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      props?.setIsActive(false)
    }
  }

  const handleDrag = (event, info) => {
    if (dropdownRef.current) {
      const maxDragY = 40
      const dropdownHeight = dropdownRef.current.clientHeight
      const closeThresholdPercentage = (dropdownHeight * maxDragY) / 100
      const { offset } = info
      if (offset.y > closeThresholdPercentage) {
        props?.setIsActive(false)
      }
    }
  }

  return (
    <div
      className={props?.isActive && windowWidth <= 767 ? "dropdown-wrapper" : null}
      onClick={(e) => {
        windowWidth <= 767 ? handleClose(e) : null
      }}
    >
      <AnimatePresence>
        {
          props?.isActive ?
            <motion.div
              ref={dropdownRef}
              className="dropdown"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              drag={windowWidth <= 767 ? "y" : null}
              dragConstraints={{ top: 0 }}
              dragSnapToOrigin={true}
              onDragEnd={(event, info) => handleDrag(event, info)}
            >
              {windowWidth <= 767 && 
              <div className="dropdown-top-bar"></div>
              }
              {props?.dropdownOptions.map((el, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      props?.setIsActive(false)
                      alert(`option clicked: ${el}`)
                    }}
                  >
                    {el}
                  </button>
                )
              })}
            </motion.div>
            : null
        }
      </AnimatePresence>
    </div>
  )
}

const Dropdown = (props) => {
  const { windowWidth } = useWindowWidth()

  return windowWidth <= 767 ? createPortal(
    <>
      <DropdownComponent {...props} />
    </>,
    document.getElementById("dropdown")
  ) : (
    <DropdownComponent {...props} />
  )
}

export default Dropdown