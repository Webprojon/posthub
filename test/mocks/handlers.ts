import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:3000";

export const handlers = [
  http.get(`${BASE_URL}/api/posts`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: [
          {
            id: 1,
            title: "First Post",
            body: "This is the first post",
            author: "John Doe",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
          {
            id: 2,
            title: "Second Post",
            body: "This is the second post with more content",
            author: "Jane Smith",
            createdAt: "2024-01-02T00:00:00.000Z",
          },
        ],
      },
      { status: 200 }
    );
  }),
  http.get(`${BASE_URL}/api/posts/:id`, ({ params }) => {
    const { id } = params;
    if (id === "1") {
      return HttpResponse.json(
        {
          success: true,
          data: {
            id: 1,
            title: "First Post",
            body: "This is the first post",
            author: "John Doe",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        },
        { status: 200 }
      );
    }
    return HttpResponse.json(
      {
        success: false,
        error: { message: "Post not found", status: 404 },
      },
      { status: 404 }
    );
  }),
  http.post(`${BASE_URL}/api/posts`, async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: 3,
          title: body.title,
          body: body.body,
          author: body.author,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  }),
  http.put(`${BASE_URL}/api/posts/:id`, async ({ request }) => {
    const body = await request.json() as any;
    return HttpResponse.json(
      {
        success: true,
        data: {
          id: parseInt(body.id || "1"),
          title: body.title,
          body: body.body,
          author: body.author,
          createdAt: "2024-01-01T00:00:00.000Z",
        },
      },
      { status: 200 }
    );
  }),
  http.delete(`${BASE_URL}/api/posts/:id`, () => {
    return HttpResponse.json(
      {
        success: true,
        data: { message: "Post deleted" },
      },
      { status: 200 }
    );
  }),
];
