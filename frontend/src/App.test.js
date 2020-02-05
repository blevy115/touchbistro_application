import React from 'react';
import { render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'

test('renders starting component', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome, Please Enter a number, we will find the Median Prime Number less than it./i);
  expect(linkElement).toBeInTheDocument();
});

test('renders input field with 0 on load', () => {
  const { getByPlaceholderText } = render(<App />);
  const linkElement = getByPlaceholderText(/Enter Number/i);
  expect(linkElement).toBeInTheDocument();
});

test('correct result should appear when number entered and button clicked', async () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number')
  const submit = getByLabelText('submit')
  fireEvent.change(input, { target: {value: 20 } });
  fireEvent.click(submit)
  await wait(() => getByLabelText('result'))
  const result = getByLabelText('result')
  expect(result).toBeInTheDocument();
  expect(result).toHaveTextContent('7 and 11')
})

test('Error Message should appear when not an integer', async () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number')
  const submit = getByLabelText('submit')
  const phrase = getByLabelText('phrase')
  fireEvent.change(input, { target: {value: 20.5 } });
  fireEvent.click(submit)
  await waitForDomChange({ phrase })
  expect(phrase).toHaveTextContent('Please Enter an Integer');
})
