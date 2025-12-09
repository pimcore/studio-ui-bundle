import { store } from "@sdk/app";
import { UserInformation } from "../user/user-api-slice.gen";
import { selectCurrentUser } from "../user/user-slice";

export const getCurrentUser = (): UserInformation => {
  return selectCurrentUser(store.getState())
}