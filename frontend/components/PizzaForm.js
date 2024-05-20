import React from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { setFormValue, toggleTopping, postOrder } from '../state/slices/formSlice'

export default function PizzaForm() {
  const dispatch = useDispatch()
  const { fullName, size, toppings, status, error } = useSelector((state) => state.form)

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch(setFormValue({ name, value }))
  }

  const handleToppingChange = (e) => {
    const { name } = e.target
    dispatch(toggleTopping(name))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postOrder({ fullName, size, toppings }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {status === 'loading' && <div className="pending">Order in progress...</div>}
      {status === 'failed' && <div className="failure">Order failed: {error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
      <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={toppings.includes('1')} onChange={handleToppingChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={toppings.includes('2')} onChange={handleToppingChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={toppings.includes('3')} onChange={handleToppingChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={toppings.includes('4')} onChange={handleToppingChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={toppings.includes('5')} onChange={handleToppingChange} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
