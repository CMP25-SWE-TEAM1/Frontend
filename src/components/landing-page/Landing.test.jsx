import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

describe("Landing page", () => {
  test("renders correctly", () => {
    render(<Landing />);

    // Logo image
    // expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();

    // Headers
    expect(screen.getByText(/happening now/i)).toBeInTheDocument();
    expect(screen.getByText(/join today\./i)).toBeInTheDocument();

    // Signup Google Button
    expect(
      screen.getByRole("button", {
        name: /sign up with google/i,
      })
    ).toBeInTheDocument();

    // Signup Apple Button
    expect(
      screen.getByRole("button", {
        name: /sign up with apple/i,
      })
    ).toBeInTheDocument();

    // Create Account
    expect(
      screen.getByRole("link", { name: /create account/i })
    ).toBeInTheDocument();

    // Terms
    expect(
      screen.getByText(/by signing up, you agree to the and , including/i)
    ).toBeInTheDocument();

    // Login
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/© 2023 gigachat corp\./i)).toBeInTheDocument();
  });
});
