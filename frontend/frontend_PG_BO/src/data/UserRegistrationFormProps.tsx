
import { User } from "./UserType";

export interface UserRegistrationFormProps {
  user?: User;
  onSave: (user: User) => void;
  onCancel: () => void;
  
}
