import { useEffect, useRef } from "react"

export default function useEventListener(
  eventType,
  callback,
  element 
) {
  const callbackRef = useRef(callback)

    useEffect(() => {
      element=element?element:window
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    const handler = e => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}
