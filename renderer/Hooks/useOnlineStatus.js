import { useEffect, useState } from "react"
import useEventListener from "./useEventListener"
export default function useOnlineStatus() {
    const [ online, setOnline ] = useState()
    
useEffect(() => {
  
setOnline(navigator.onLine)
  return () => {
    
  }
}, [])

  useEventListener("online", () => setOnline(navigator.onLine))
  useEventListener("offline", () => setOnline(navigator.onLine))

  return online
}
