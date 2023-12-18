import React, { useEffect, useState } from 'react'
import * as yup from 'yup'


const intitialFormValues = {
  fullName: '',
  size: '',
  pepperoni: false,
  greenPeppers: false, 
  pineApple: false, 
  mushrooms: false,
  ham: false,
}


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(20, validationErrors.fullNameTooLong)
    .min(3, validationErrors.fullNameTooShort)
    .required('Name is required'),
  size: yup
    .string()
    .oneOf(['small','medium','large'],validationErrors.sizeIncorrect),
  pepperoni: yup.boolean(),
  greenPeppers: yup.boolean(),
  pineApple: yup.boolean(),
  mushrooms: yup.boolean(),
  ham: yup.boolean(),
})
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]






export default function Form() {

  const [ formErrors, setFormErrors] = useState({})
  const [ formValues, setFormValues ] = useState(intitialFormValues)
  const [ submitEnabled, setSubmitEnabled ] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value
    setFormValues({...formValues, [name]:inputValue})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const pizzaOrder = {
      fullName: formValues.fullName.trim(),
      size: formValues.size,
      toppings: ['Pepperoni', 'Green Peppers', 'Pineapple', 'Mushrooms', 'Ham'].filter(topper => !!formValues[topper])
    }
    
  }

  useEffect(() => {
    formSchema.isValid(formValues).then((isValid) => {
      setSubmitEnabled(isValid)
    })
  }, [formValues])

  return (

    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" onChange={handleChange} value={formValues.fullName}/>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            <option value={formValues.size}>S</option>
            <option value={formValues.size}>M</option>
            <option value={formValues.size}>L</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => {
          return (
            <label key={topping.topping_id}>
              <input
                name={topping.text}
                type='checkbox'
                value={topping.text}
                onChange={handleChange}
                />
                {topping.text}<br/>
            </label>
          )
        })}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!submitEnabled}/>
    </form>
  )
}
