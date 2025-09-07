import { IoClose } from 'react-icons/io5';

const SOUTHEAST_ASIAN_CITIES = [
  { code: 'SIN', city: 'Singapore', name: 'Singapore, SIN' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur, KUL' },
  { code: 'BKK', city: 'Bangkok', name: 'Bangkok, BKK' },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong, HKG' },
  { code: 'MNL', city: 'Manila', name: 'Manila, MNL' },
  { code: 'CGK', city: 'Jakarta', name: 'Jakarta, CGK' },
  { code: 'HAN', city: 'Hanoi', name: 'Hanoi, HAN' },
  { code: 'SGN', city: 'Ho Chi Minh City', name: 'Ho Chi Minh City, SGN' },
  { code: 'REP', city: 'Siem Reap', name: 'Siem Reap, REP' },
  { code: 'RGN', city: 'Yangon', name: 'Yangon, RGN' },
  { code: 'VTE', city: 'Vientiane', name: 'Vientiane, VTE' },
  { code: 'BWN', city: 'Bandar Seri Begawan', name: 'Bandar Seri Begawan, BWN' },
];

interface City {
  code: string;
  city: string;
  name: string;
}

interface CityPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: City) => void;
  title: string;
}

export const CityPickerModal: React.FC<CityPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  title,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md max-h-[80vh] bg-white rounded-t-2xl shadow-xl animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-tertiary-foreground">
          <h2 className="text-lg font-bold text-foreground-light">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <IoClose size={24} className="text-foreground-light" />
          </button>
        </div>

        {/* City List */}
        <div className="flex-1 overflow-y-auto px-6">
          {SOUTHEAST_ASIAN_CITIES.map((city) => (
            <button
              key={city.code}
              className="w-full py-4 border-b border-tertiary-foreground text-left"
              onClick={() => onSelect(city)}
            >
              <span className="text-base text-foreground-light font-medium">
                {city.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
