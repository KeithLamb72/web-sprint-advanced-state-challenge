// frontend/components/PizzaForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormState, setStatus, setErrorMessage, resetFormState } from '../state/slices/formSlice';
import { usePostOrderMutation } from '../state/services/ordersApi';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [postOrder] = usePostOrderMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const newToppings = checked
        ? [...formState.toppings, name]
        : formState.toppings.filter((topping) => topping !== name);
      dispatch(updateFormState({ toppings: newToppings }));
    } else {
      dispatch(updateFormState({ [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setStatus('loading'));
    try {
      await postOrder({
        fullName: formState.fullName,
        size: formState.size,
        toppings: formState.toppings,
      }).unwrap();
      dispatch(resetFormState());
      dispatch(setStatus('succeeded'));
    } catch (error) {
      dispatch(setErrorMessage(error.data.message));
      dispatch(setStatus('failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>
      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={formState.toppings.includes('1')}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={formState.toppings.includes('2')}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={formState.toppings.includes('3')}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={formState.toppings.includes('4')}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={formState.toppings.includes('5')}
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
      {formState.status === 'loading' && <div>Order in progress...</div>}
      {formState.status === 'failed' && <div>Error: {formState.errorMessage}</div>}
    </form>
  );
}
