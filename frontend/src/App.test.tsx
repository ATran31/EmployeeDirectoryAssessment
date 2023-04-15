import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import fetch from 'jest-fetch-mock'
import { Employee } from './models/Models';

beforeEach(() => {
  fetch.resetMocks();
})

test('renders employee directory', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    {
      id: '1',
      name: 'Test Employee 1',
    } as Employee
  ]));
  
  render(<App />);
  const linkElement = screen.getByText(/Employee Directory/i);
  expect(linkElement).toBeInTheDocument();
  
  await waitFor(() => screen.getByRole('heading', { level: 2}))

  const employeeElement = screen.getByText(/Test Employee 1/i);
  expect(employeeElement).toBeInTheDocument()
  
});

