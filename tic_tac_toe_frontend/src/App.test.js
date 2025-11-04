import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tic tac toe title and status', () => {
  render(<App />);
  expect(screen.getByText(/TIC · TAC · TOE/i)).toBeInTheDocument();
  expect(screen.getByText(/Next player:/i)).toBeInTheDocument();
});
