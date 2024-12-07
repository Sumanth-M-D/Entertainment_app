import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetLoggedInUserQuery } from "../features/userSlice";
import { setUserdata } from "../features/userSlice";

export function useLoadLoggedInUserData() {
  const dispatch = useDispatch();

  const { data: userData, isLoading: isUserDataLoading } =
    useGetLoggedInUserQuery();

  useEffect(() => {
    if (userData) {
      dispatch(setUserdata(userData));
    }
  }, [userData, dispatch]);

  return { isUserDataLoading };
}
