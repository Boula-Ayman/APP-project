import { ResponseData } from '../interfaces/common.interface';
import apiSlice from './apiSlice';

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};

const notificationsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifications: builder.query<{ data: Notification[] }, void>({
      query: () => ({
        url: '/notifications/me',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    readAllNotifications: builder.mutation<ResponseData<void>, void>({
      query: () => ({
        url: '/notifications/me/read-all',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadAllNotificationsMutation } =
  notificationsApiSlice;
