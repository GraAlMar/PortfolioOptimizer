import {User} from "./UserType"
export interface UserRegistrationProps {
  onSave?: (user: User) => void;
  onCancel?: () => void;
  
}
