import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowWidth(window.innerWidth)
    }, 200)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { windowWidth } // windowWidth will return integer value of the window's width
}