import { useState } from 'react'
import githubLogo from './assets/github.svg'
import loopIcon from './assets/loop.svg'
import { api } from './components/api/api'
import { form } from './components/form/form'
import { useEffect } from 'react'
// import './App.scss'



function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [image, setImage] = useState(githubLogo)

  useEffect(() => {
    console.log(data)
  }, [data])

  const searchQuery = (e) => {
    e.preventDefault()

    const formBody = form.parseToBody(e.target.form);

    api.get(`https://api.github.com/search/users?q=${formBody.query}`)
    .then(data => { 
      setData(data)
      // setImage(data.avatar_url)
    })
    .catch(err => { throw new Error(err) })
  }

  // console.log(api.get("https://api.github.com/users/stefanradouane"))

  

  return (
    <div className="App">
      <div>
        <img src={image} className="icon icon--github" alt="Github logo" />
      </div>
      <h1>GitHub</h1>
      <h2>Scanner</h2>
      <form className="search">
        <input type="text" name="query"/>
        <button className="control" onClick={searchQuery}>
          <img src={loopIcon} className="icon icon--loop" alt="Loop logo" />
        </button>
      </form>
    </div>
  )
}

export default App
