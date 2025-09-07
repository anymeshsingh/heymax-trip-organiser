import { IoArrowBack, IoAdd } from 'react-icons/io5';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightAction,
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between px-6 py-4 mt-2">
      {showBackButton ? (
        <button
          className="w-10 h-10 flex justify-start items-center"
          onClick={handleBackPress}
        >
          <IoArrowBack size={24} className="text-foreground-dark" />
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}
      
      <h1 className="text-xl font-bold text-foreground-dark text-center">
        {title}
      </h1>
      
      {rightAction ? (
        <button
          className="w-10 h-10 flex justify-center items-center"
          onClick={rightAction.onPress}
        >
          <IoAdd size={24} className="text-foreground-dark" />
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}
    </div>
  );
};
