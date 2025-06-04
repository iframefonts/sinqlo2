import React from 'react';

// Define own props for the Button, making 'children' and 'disabled' explicit.
export type ButtonOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode; // Ensure children is required
  className?: string;
  disabled?: boolean; // Controlled disabled state
};

// Combine own props with props of the "as" component, omitting conflicts.
// This allows passing through any valid prop for the 'as' component (e.g., 'to' for Link).
export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const defaultElement = 'button';

// Generic function component definition for polymorphism
const Button = <E extends React.ElementType = typeof defaultElement,>(
  {
    as,
    children,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    isLoading = false,
    className = '',
    disabled, // Destructure 'disabled' from our ButtonOwnProps
    ...props // These are the remaining props for the 'as' component (e.g., 'to', 'href')
  }: ButtonProps<E>
): JSX.Element => {
  const Component = as || defaultElement;

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary',
    secondary: 'bg-gray-200 text-brand-secondary hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
    ghost: 'text-brand-primary hover:bg-gray-100 focus:ring-brand-primary',
    link: 'text-brand-accent hover:underline focus:ring-brand-accent',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Prepare final props to be passed to the rendered component
  const finalProps: React.ComponentPropsWithoutRef<E> = { ...props } as React.ComponentPropsWithoutRef<E>;

  // Set default 'type' for button elements if not provided
  if (Component === 'button' && !(finalProps as React.ButtonHTMLAttributes<HTMLButtonElement>).type) {
    (finalProps as React.ButtonHTMLAttributes<HTMLButtonElement>).type = 'button';
  }

  // Apply 'disabled' state based on isLoading or the passed 'disabled' prop.
  // This attribute will be passed to the Component. If it's an <a> tag,
  // it might not have functional effect but can be used for styling via [disabled].
  (finalProps as any).disabled = isLoading || disabled;


  return (
    <Component className={combinedClassName} {...finalProps}>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </Component>
  );
};

export default Button;