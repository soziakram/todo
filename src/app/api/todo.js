import { api } from "./api";
const todoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({ query: () => "/todo/", providesTags: ["Todo"] }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todo/",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    completeTodo: builder.mutation({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: "DELETE",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
