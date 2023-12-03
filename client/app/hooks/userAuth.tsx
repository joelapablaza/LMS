import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  const isAuthenticated = user.isVerified;
  return isAuthenticated;
}
