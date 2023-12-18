import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

const intitialFormValues = {
  
}


const [ formValues, setFormValues ] = useState('')
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


// useEffect(() => {
//   formSchema.
// }, [])



export default function Form() {
  return (
    <form>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input placeholder="Type full name" id="fullName" type="text" />
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size">
            <option value="">----Choose Size----</option>
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
          </select>
        </div>
        {true && <div className='error'>Bad value</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => {
          return (
            <label key={topping.topping_id}>
              <input
                name={topping.topping_id}
                type='checkbox'
                />
                {topping.text}<br/>
            </label>
          )
        })}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" />
    </form>
  )
}
