export const postKeys = {
  all: ["posts"] as const,

  list: () => [...postKeys.all, "list"] as const,

  detail: (id: number | string) => [...postKeys.all, "detail", id] as const,
};
