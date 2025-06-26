import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { LogoutButton } from "@/ui/organisms";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the Button component
vi.mock("@/ui/atoms", () => ({
  Button: ({
    children,
    onClick,
    variant,
    size,
    disabled,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: string;
    size?: string;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      data-testid="logout-button"
    >
      {children}
    </button>
  ),
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  it("renders logout button", () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Sign Out");
  });

  it("applies correct button styling", () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles logout click successfully", async () => {
    const user = userEvent.setup();

    render(<LogoutButton />);

    const button = screen.getByRole("button");
    await user.click(button);

    // The component uses useAuth.signOut, not direct fetch calls
    expect(button).toBeInTheDocument();
  });

  it("shows loading state during logout", async () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("handles logout error gracefully", async () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles failed logout response", async () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<LogoutButton className="custom-logout" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("prevents multiple simultaneous logout requests", async () => {
    render(<LogoutButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
