import { api } from "./base";

export const createResourceApi = <Entity, CreateDto, UpdateDto>(
  endpoint: string,
) => {
  return {
    getList: () => api.get<Entity[]>(endpoint),

    getById: (id: number | string) => api.get<Entity>(`${endpoint}/${id}`),

    create: (data: CreateDto) => api.post<Entity>(endpoint, data),

    update: (id: number | string, data: UpdateDto) =>
      api.put<Entity>(`${endpoint}/${id}`, data),

    remove: (id: number | string) => api.delete<void>(`${endpoint}/${id}`),
  };
};
