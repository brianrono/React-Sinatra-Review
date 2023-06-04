import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [students,setStudents] = useState([])
  const [refresh,setRefresh] = useState(false)
  const [name,setName] = useState("")
  const [age,setAge] = useState(0)
  useEffect(() => {
    fetch("http://localhost:9292/students")
    .then(res => res.json())
    .then(data => {
      setStudents(data)
    })
  },[])
  function handleDelete(id) {
        fetch(`http://localhost:9292/students/${id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(data => {
          setRefresh(!refresh)
          console.log(data)
        })
         setRefresh(!refresh)


  }
  function handleSubmit(e,id) {
    e.preventDefault()
    const formData = {
      name: name,
      age: age
    }
    fetch(`http://localhost:9292/students/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(() => setRefresh(!refresh))

  }
  
  return (
    <>
    <h1>Student List</h1>
    <ul>
      {students.map(student => (
        <>
        <li>{student.name}  {student.age}</li>
        <form onSubmit={(e) => handleSubmit(e,student.id)}>
          <input
          placeholder='update name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <input
          placeholder='update age'
          value = {age}
          onChange={(e) => setAge(e.target.value)}
          />
          <button>Update</button>
        </form>
        <button onClick={() =>handleDelete(student.id)}>Delete</button>
        </>
      ))}
    </ul>
    </>
  )
}

export default App
