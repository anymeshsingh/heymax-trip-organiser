import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { CityPickerModal } from '../modals/CityPickerModal';

interface CitySelectorProps {
  label: string;
  value?: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  label,
  value,
  placeholder,
  onValueChange,
  error,
}) => {
  const [showCityPicker, setShowCityPicker] = useState(false);

  const handleCitySelect = (city: any) => {
    onValueChange(city.name);
    setShowCityPicker(false);
  };

  const getCityPickerTitle = () => {
    return `Select ${label}`;
  };

  return (
    <div className="mb-6">
      <label className="block text-base text-foreground-light font-medium mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setShowCityPicker(true)}
        className="w-full flex items-center justify-between bg-transparent py-2"
      >
        <span className={`text-2xl font-bold flex-1 text-left py-2 ${
          !value ? 'text-secondary-foreground font-normal' : 'text-foreground-light'
        }`}>
          {value || placeholder}
        </span>
        <IoChevronDown size={20} className="text-tertiary-foreground ml-2" />
      </button>
      {error && (
        <span className="text-sm text-error-foreground mt-2 block">
          {error}
        </span>
      )}

      {/* City Picker Modal */}
      <CityPickerModal
        visible={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        onSelect={handleCitySelect}
        title={getCityPickerTitle()}
      />
    </div>
  );
};
