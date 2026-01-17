import { render, screen, waitFor } from "@/test/utils/test-utils";
import PostsPage from "@/app/posts/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("PostsPage", () => {
  it("should display loading message", async () => {
    render(<PostsPage />);
    ~expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("should display posts list when loaded", async () => {
    render(<PostsPage />);
    await waitFor(() => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
    });
  });

  it("should display error message on failure", async () => {
    const { server } = await import("@/test/mocks/server");
    const { http, HttpResponse } = await import("msw");

    server.use(
      http.get("http://localhost:3000/api/posts", () =>
        HttpResponse.json(
          {
            success: false,
            error: { message: "Server error", status: 500 },
          },
          { status: 500 }
        )
      )
    );

    render(<PostsPage />);
    await waitFor(() => {
      expect(screen.getByText("Failed to load posts")).toBeInTheDocument();
    });
  });
});
