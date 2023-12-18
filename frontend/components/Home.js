import React from 'react'
import pizza from './images/pizza.jpg'
import { useNavigate } from 'react-router-dom'
import Form from './Form'




function Home() {

  const navigate = useNavigate()

  const goHome = () => {
    navigate('/order')
  }
  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      <img onClick={goHome} alt="order-pizza" style={{ cursor: 'pointer' }} src={pizza} />
    </div>
  )
}

export default Home
