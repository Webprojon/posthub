import { render, screen, waitFor } from "@/test/utils/test-utils";
import userEvent from "@testing-library/user-event";
import CreatePage from "@/app/create/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("CreatePage", () => {
  it("should show validation error when empty", async () => {
    const user = userEvent.setup();
    render(<CreatePage />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter post title")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /create post/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });

  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    render(<CreatePage />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter post title")).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText("Enter post title");
    const bodyInput = screen.getByPlaceholderText("Enter post content");
    const submitButton = screen.getByRole("button", { name: /create post/i });

    await user.type(titleInput, "Test Post");
    await user.type(bodyInput, "This is test content");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /creating/i })).toBeInTheDocument();
    });
  });
});
