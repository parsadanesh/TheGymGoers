import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import App from "../src/App";

vi.mock('axios');

describe('App Component', () => {
    beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('renders login page when not logged in', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders register page when navigating to sign-up', () => {
    render(<App />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

//   it('logs in a user and shows the workout form', async () => {
//       render(<App />, { wrapper: MemoryRouter });
      

//     // Wait for the "login" button to appear before clicking
//     const loginButton = await screen.findByText(/login/i);
//     fireEvent.click(loginButton);

//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
//     fireEvent.click(screen.getByText(/submit/i));

//     await screen.findByText(/log out/i);
//     expect(screen.getByText(/log out/i)).toBeInTheDocument();
//   });
});