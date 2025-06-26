import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Create a wrapper for React Query
export const createQueryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const QueryWrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  QueryWrapper.displayName = "QueryWrapper";

  return QueryWrapper;
};

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock next/navigation
beforeAll(() => {
  vi.mock("next/navigation", () => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => "/",
  }));

  // Mock framer-motion
  vi.mock("framer-motion", () => ({
    motion: {
      div: "div",
      main: "main",
    },
  }));

  // Mock hooks
  vi.mock("@/hooks/useGames", () => ({
    useGames: () => ({
      getFilteredGames: vi.fn(() =>
        Array(12)
          .fill(0)
          .map((_, i) => ({
            id: `game-${i}`,
            title: `Game ${i + 1}`,
            imageUrl: `https://example.com/game-${i}.jpg`,
            imageId: `game-image-${i}`,
            slug: `game-${i}`,
          }))
      ),
      removeGame: vi.fn(),
      isGameSaved: vi.fn(() => false),
    }),
  }));

  vi.mock("@/hooks/useGamesSearch", () => ({
    useGamesSearch: () => ({
      data: [],
      isLoading: false,
      error: null,
    }),
  }));

  vi.mock("@/hooks/useDebounce", () => ({
    useDebounce: (value: string) => value,
  }));

  vi.mock("@/hooks/useAuth", () => ({
    useAuth: () => ({
      user: null,
      session: null,
      loading: false,
      signIn: vi.fn(() => Promise.resolve({})),
      signUp: vi.fn(() => Promise.resolve({})),
      signOut: vi.fn(() => Promise.resolve({})),
      forgotPassword: vi.fn(() => Promise.resolve({})),
      resetPassword: vi.fn(() => Promise.resolve({})),
    }),
  }));

  // Mock IGDB API
  vi.mock("@/lib/igdb", () => ({
    getPopularGames: vi.fn(() => Promise.resolve([])),
    searchGames: vi.fn(() => Promise.resolve([])),
  }));

  // Mock environment variables
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

  // Mock Toast components globally
  vi.mock("@radix-ui/react-toast", () => ({
    Provider: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", {}, children),
    Root: ({
      children,
      open,
    }: {
      children: React.ReactNode;
      open?: boolean;
    }) =>
      open
        ? React.createElement("div", { "data-testid": "toast-root" }, children)
        : null,
    Title: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "toast-title" }, children),
    Description: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        "div",
        { "data-testid": "toast-description" },
        children
      ),
    Action: ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "toast-action" }, children),
    Close: ({ children }: { children: React.ReactNode }) =>
      React.createElement("button", { "data-testid": "toast-close" }, children),
    Viewport: () =>
      React.createElement("div", { "data-testid": "toast-viewport" }),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock scrollIntoView
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    value: vi.fn(),
    writable: true,
  });
});
