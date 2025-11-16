import { Navigate } from "react-router-dom";
import { UserRole, UserType } from "../../types/user.type";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  element: React.ReactNode;
  protected?: boolean;
  roles?: UserRole[];
}

export function RouteGuard({ element, protected: isProtected, roles }: Props) {  
  const { user } = useSelector((state: RootState) => state.auth);
  
  // No auth needed
  if (!isProtected) return element;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role not allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
}
