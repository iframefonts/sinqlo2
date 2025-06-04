import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonProps } from './Button';

// Props for SafeLinkButton:
// Takes all props a normal Button would take (when rendering as a <button>),
// but omits 'as' (it's not polymorphic in that way) and 'onClick' (it handles its own click for navigation).
// Adds a required 'to' prop for the navigation path.
// Allows an optional 'userOnClick' if the user wants to run additional logic.
interface SafeLinkButtonProps extends Omit<ButtonProps<'button'>, 'as' | 'onClick' | 'type'> {
  to: string;
  userOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SafeLinkButton: React.FC<SafeLinkButtonProps> = ({
  to,
  userOnClick,
  children,
  ...rest // other ButtonProps like variant, size, disabled, isLoading, className, leftIcon, rightIcon
}) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (userOnClick) {
      userOnClick(event);
    }

    // If the user's onClick handler prevented default, respect that and do not navigate.
    if (event.defaultPrevented) {
      return;
    }

    // The underlying Button component defaults to type="button", so event.preventDefault()
    // is not strictly necessary here to prevent form submission unless Button's type was changed.
    // However, it's good practice for clarity if replacing link-like behavior.
    // event.preventDefault(); 

    if (!rest.disabled && !rest.isLoading) {
      navigate(to);
    }
  };

  return (
    // The Button component will default to rendering a <button type="button">
    // if 'as' is not specified.
    <Button onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};

export default SafeLinkButton;