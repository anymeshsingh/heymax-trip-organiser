"use client";

import { primaryColorDark, foregroundColorDark, primaryColorLight, foregroundColorLight } from './appColors';

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  dark: boolean;
}

export const PrimaryButton = ({
  title,
  onClick,
  style,
  className = "",
  disabled = false,
  dark = false,
}: PrimaryButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: dark ? primaryColorDark : primaryColorLight,
    color: dark ? foregroundColorDark : foregroundColorLight,
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingLeft: '60px',
    paddingRight: '60px',
    borderRadius: '25px',
    marginRight: '20px',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    ...style,
  };

  return (
    <button
      type="button"
      className={className}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      {title}
    </button>
  );
};