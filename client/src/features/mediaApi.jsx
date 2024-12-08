import { API_BASE_URL } from "../config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Bookmarks"], // Add tag types for cache invalidation

  endpoints: (builder) => ({
    getTrendingMedia: builder.query({
      query: () => ({ url: "media/trending" }),
      transformResponse: (response) => response.data.results,
      transformErrorResponse: (error) => {
        return { ...error.data, status: "Failed to fetch trending media" };
      },
    }),

    getRecommendedMedia: builder.query({
      query: () => ({ url: "media/recommended" }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => {
        return { ...error.data, status: "Failed to fetch recommended media" };
      },
    }),

    getMediaList: builder.query({
      query: (type) => ({
        url: `media/${type === "movie" ? "movies" : "tvshows"}`,
      }),
      transformResponse: (response) => response.data.results,
      transformErrorResponse: (error) => error.data,
    }),

    getMediaDetails: builder.query({
      query: ({ id, type }) => {
        return {
          url: `media/${type === "movie" ? "movies" : "tvshows"}/${id}`,
        };
      },
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => {
        return { ...error.data, status: "Failed to fetch media details" };
      },
    }),

    getMediaUrl: builder.query({
      query: ({ id, type }) => {
        return {
          url: `media/${type === "movie" ? "movies" : "tvshows"}/url/${id}`,
        };
      },
      transformResponse: (response) => response.data.key,
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    getMediaCast: builder.query({
      query: ({ id, type }) => {
        return {
          url: `media/${type === "movie" ? "movies" : "tvshows"}/cast/${id}`,
        };
      },
      transformResponse: (response) => response.data.cast,
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    getSearchMedia: builder.query({
      query: ({ searchText, type }) => {
        let typeParam;

        if (type === "movies") {
          typeParam = "movies/";
        } else if (type === "tvshows") {
          typeParam = "tvshows/";
        } else {
          typeParam = "";
        }

        const url = `media/${typeParam}search?searchtext=${searchText}`;

        return { url };
      },
      transformResponse: (response) => {
        return response.data.results;
      },
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    postUserLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response) => response.data.user,
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    postUserSignup: builder.mutation({
      query: ({ email, password, passwordConfirm }) => ({
        url: "user/signup",
        method: "POST",
        body: { email, password, passwordConfirm },
      }),
      transformResponse: (response) => response.data.user,
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    getLoggedInUser: builder.query({
      query: () => ({ url: "user" }),
      transformResponse: (response) => response.data.user,
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    postLogoutUser: builder.mutation({
      query: () => ({ url: "user/logout", method: "POST" }),
      transformResponse: (response) => {
        console.log(response);
        return response.data;
      },
      transformErrorResponse: (error) => {
        return error.data;
      },
    }),

    getUserBookmarks: builder.query({
      query: () => ({ url: "bookmarks" }),
      transformResponse: (response) => {
        return response.data.bookmarks.bookmarkList;
      },
      transformErrorResponse: (error) => {
        return error.data;
      },
      providesTags: ["Bookmarks"], // Provide tags for cache invalidation
    }),

    addUserBookmark: builder.mutation({
      query: ({ id, type }) => ({
        url: `bookmarks`,
        method: "POST",
        body: { id, type },
      }),
      transformResponse: (response) => response.data.bookmarks.bookmarkList,
      transformErrorResponse: (error) => {
        return error.data;
      },
      invalidatesTags: ["Bookmarks"],
    }),

    deleteUserBookmark: builder.mutation({
      query: ({ id }) => ({
        url: `bookmarks`,
        method: "DELETE",
        body: { id },
      }),
      transformResponse: (response) => response.data.bookmarks.bookmarkList,
      transformErrorResponse: (error) => {
        return error.data;
      },
      invalidatesTags: ["Bookmarks"],
    }),
  }),
});

export const {
  useGetTrendingMediaQuery,
  useGetRecommendedMediaQuery,
  useGetMediaListQuery,
  useGetMediaDetailsQuery,
  useGetMediaUrlQuery,
  useGetMediaCastQuery,
  useGetSearchMediaQuery,

  usePostUserLoginMutation,
  usePostUserSignupMutation,
  usePostLogoutUserMutation,
  useGetLoggedInUserQuery,

  useLazyGetUserBookmarksQuery,
  useAddUserBookmarkMutation,
  useDeleteUserBookmarkMutation,
} = mediaApi;
