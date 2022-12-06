import React, { useState } from 'react'
import service from '../api/apiHandler'
import { useNavigate } from 'react-router-dom'
import useAuth from '../auth/useAuth'

const EditProfile = () => {
  const { removeUser } = useAuth()
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await service.patch('/api/me', formData)
      console.log("DATA", data)
      removeUser()
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
    }
  }
  const { password, newPassword } = formData

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10rem" }}>
      <div>
        <label htmlFor='password'>Mot de passe :</label>
        <input type='password' id='password' name='password' value={password}
          onChange={handleChange} />


      </div>
      <div>
        <label htmlFor='newPassword'>Nouveau mot de passe :</label>
        <input type='password' id='newPassword' name='newPassword' value={newPassword}
          onChange={handleChange} />


      </div>
      <button>Enregistrer</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default EditProfile