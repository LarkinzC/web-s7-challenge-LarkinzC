import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

const intitialFormValues = {
  fullName: "",
  size: "",
  // Pepperoni: false,
  // "Green Peppers": false,
  // Pineapple: false,
  // Mushrooms: false,
  // Ham: false,
  toppings: []
};

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: "full name must be at least 3 characters",
  fullNameTooLong: "full name must be at most 20 characters",
  sizeIncorrect: "size must be S or M or L",
};

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required("Name is required"),
  size: yup.string().oneOf(["S", "M", "L"], validationErrors.sizeIncorrect),
  Pepperoni: yup.boolean(),
  "Green Peppers": yup.boolean(),
  Pineapple: yup.boolean(),
  Mushrooms: yup.boolean(),
  Ham: yup.boolean(),
});
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: "1", text: "Pepperoni" },
  { topping_id: "2", text: "Green Peppers" },
  { topping_id: "3", text: "Pineapple" },
  { topping_id: "4", text: "Mushrooms" },
  { topping_id: "5", text: "Ham" },
];

export default function Form() {
  const [formErrors, setFormErrors] = useState("");
  const [formValues, setFormValues] = useState(intitialFormValues);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isValid, setIsValid] = useState(false)

  const getCheckedBoxValue = (name, checked) => {
    return checked ? true : false;
  };

const onChangeToppings= (e) => {

  const { name, checked }= e.target
  console.log(name, checked)
  setFormValues({...formValues, toppings: [...formValues.toppings, name ]})

}
  
  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const inputValue =
      type === "checkbox" ? getCheckedBoxValue(name, checked) : e.target.value;

    // console.log({...formValues, [name]:inputValue})
    setFormValues({ ...formValues, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("values", formValues);
    const formData = { ...formValues };
    console.log(formData)
    axios
      .post("http://localhost:9009/api/order", formData)
      .then((res) => setSuccessMessage(res.data.message))
      .catch((err) => setFormErrors(err.message))
      .finally(setFormValues(intitialFormValues));
  };

  useEffect(() => {
    const validateForm = async () => {
      try {
        await formSchema.validate(formValues)
        setIsValid(true)
        console.log('isValid true ')
      } catch (error) {
        setIsValid(false)
        console.log('isValid false ')
      }
    }
    validateForm()
  }, [formValues]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {formErrors && <div className="failure">{formErrors}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            placeholder="Type full name"
            id="fullName"
            type="text"
            onChange={handleChange}
            value={formValues.fullName}
            name="fullName"
          />
        </div>
        {formErrors.fullName && (
          <div className="error">{formErrors.fullName}</div>
        )}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            value={formValues.size}
            name="size"
            id="size"
            onChange={handleChange}
          >
            <option value="">----Choose Size----</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>
        {formErrors.size && <div className="error">{formErrors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map((topping) => {
          return (
            <label key={topping.topping_id}>
              <input
                name={topping.text}
                type="checkbox"
                value={topping.topping_id}
                onChange={onChangeToppings}
              />
              {topping.text}
              <br />
            </label>
          );
        })}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input type="submit" disabled={!isValid} />
    </form>
  );
}
