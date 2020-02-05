import React from 'react';
import { render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import App from './App';

test('Renders starting component', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome, Please Enter a number, we will find the Median Prime Number less than it./i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders blank input field with placeholder text on load', () => {
  const { getByPlaceholderText } = render(<App />);
  const linkElement = getByPlaceholderText(/Enter Number/i);
  expect(linkElement).toBeInTheDocument();
});

test('Button should be disabled if input field blank', () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number');
  const submit = getByLabelText('submit');
  expect(submit).toHaveProperty('disabled', true);
  fireEvent.change(input, { target: {value: 20 } });
  expect(submit).toHaveProperty('disabled', false);
});

test('Correct result should appear when number entered and button clicked', async () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number');
  const submit = getByLabelText('submit');
  const phrase = getByLabelText('phrase');
  fireEvent.change(input, { target: {value: 20 } });
  fireEvent.click(submit);
  await wait(() => getByLabelText('result'));
  const result = getByLabelText('result');
  expect(result).toBeInTheDocument();
  expect(result).toHaveTextContent('Result: 7 and 11');
  expect(phrase).toHaveTextContent(`There's the Median Prime, Enter another number to try again.`);
});

test('Error Message should appear when not an integer', async () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number');
  const submit = getByLabelText('submit');
  const phrase = getByLabelText('phrase');
  fireEvent.change(input, { target: {value: 20.5 } });
  fireEvent.click(submit);
  await waitForDomChange({ phrase });
  expect(phrase).toHaveTextContent('Please Enter an Integer');
});

test('Calculating should appear if large number entered', () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number');
  const submit = getByLabelText('submit');
  const phrase = getByLabelText('phrase');
  fireEvent.change(input, { target: {value: 20000000 } });
  fireEvent.click(submit);
  expect(phrase).toHaveTextContent('Calculating...');
  expect(submit).toHaveProperty('disabled', true);
});

test('Message should say Number too Large if too Large for Formula', () => {
  const{ getByLabelText } = render(<App />);
  const input = getByLabelText('number');
  const submit = getByLabelText('submit');
  const phrase = getByLabelText('phrase');
  fireEvent.change(input, { target: {value: 2000000000 } });
  fireEvent.click(submit);
  expect(phrase).toHaveTextContent('Number too large, try a smaller number');
});
