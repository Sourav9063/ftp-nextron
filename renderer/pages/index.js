import Link from 'next/link'
import { useState, useEffect } from 'react'
import useOnlineStatus from '../Hooks/useOnlineStatus'

const Home = () => {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState(null)
const [notes, setNotes]= useState(null)
  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message)
    
    const handleLoadData = (event, message) => {
      console.log(message)
      setNotes(message?.data?.notes)
    }
    const handleSaveData = (event, message) => {
      console.log(message)

      setNotes(message?.data?.notes)

    }
    
    window.electron.message.on(handleMessage)
    window.electron.loadData.on(handleLoadData)
    window.electron.saveData.on(handleSaveData)
    window.electron.loadData.send();

    return () => {
      window.electron.message.off(handleMessage)
      window.electron.loadData.off( handleLoadData)
      window.electron.saveData.off( handleSaveData)
    }
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    window.electron.message.send({input:input,link:'https://sites.google.com/view/bdixftpserverlist/media-ftp-servers'})
    setMessage(null)
  }
  const online =useOnlineStatus()

  return (
    <>
      
      <h1>Hello Electron!</h1>
      {message && <p>{message}</p>}

      <h1>{online ? 'Online' : 'Offline'}</h1>
      {notes && notes.map((note ,index)=>
      <h2 key={index}>{note}</h2>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <button onClick={(e) => {
        const pre=notes?notes:[]
      if(input) { window.electron.saveData.send({
          notes: [
            input, ...pre
          ]
        })
        setInput("")}
}}>Save</button>
      <br />
  <Link href={'/about'} target='_blank'>
        About
      </Link>
      <style jsx>{`
        h1 {
          color: red;
          font-size: 50px;
        }
      `}</style>
    </>
  )
}

export default Home
