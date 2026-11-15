import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navbar brand, playground heading and footer', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Vortex' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Model Playground' })).toBeInTheDocument();
  expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
});
