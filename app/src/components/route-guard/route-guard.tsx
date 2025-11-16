import { Navigate } from "react-router-dom";
import { UserRole, UserType } from "../../types/user.type";
import LocalStorageUtil from "../../utils/local-storage";

interface Props {
  element: React.ReactNode;
  protected?: boolean;
  roles?: UserRole[];
}

export function RouteGuard({ element, protected: isProtected, roles }: Props) {  
  const LS=new LocalStorageUtil();
  const user= LS.getUserObject();

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
