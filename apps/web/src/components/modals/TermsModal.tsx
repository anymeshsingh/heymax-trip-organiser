import { IoClose, IoAlertCircle } from 'react-icons/io5';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  partnerName: string;
  partnerLogo: string;
  logoBackgroundColor: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  visible,
  onClose,
  partnerName,
  partnerLogo,
  logoBackgroundColor,
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
      <div className="relative w-full max-w-md max-h-[90vh] bg-white rounded-t-2xl shadow-xl animate-slide-up flex flex-col">
        {/* Handle indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-foreground-light">Terms & Exclusions</h2>
          <button onClick={onClose} className="p-1">
            <IoClose size={24} className="text-foreground-light" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-6">
          {/* Partner Info */}
          <div className="flex items-center mb-6">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mr-4"
              style={{ backgroundColor: logoBackgroundColor }}
            >
              <img 
                src={partnerLogo}
                alt={partnerName}
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground-light mb-1">{partnerName}</h3>
              <div className="flex items-center">
                <img 
                  src="/icons/heymax-icon.png"
                  alt="HeyMax"
                  className="w-4 h-4 mr-1.5"
                />
                <span className="text-base text-primary-light font-semibold">4.25/SGD on hotels</span>
              </div>
            </div>
          </div>

          {/* Exclusions Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground-light mb-4">Exclusions</h3>
            
            <div className="flex items-center mb-4">
              <IoAlertCircle size={20} className="text-error-foreground mr-3" />
              <span className="text-base text-foreground-light">Max Miles are excluded for taxes ???</span>
            </div>

            <div className="flex items-center mb-4">
              <IoAlertCircle size={20} className="text-error-foreground mr-3" />
              <span className="text-base text-foreground-light">Booking activities excluded</span>
            </div>

            <div className="flex items-center mb-4">
              <IoAlertCircle size={20} className="text-error-foreground mr-3" />
              <span className="text-base text-foreground-light">Travel insurance excluded</span>
            </div>
          </div>

          {/* Terms & Conditions Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground-light mb-4">Terms & Conditions</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground-light mt-2 mr-3 flex-shrink-0" />
                <p className="text-base text-foreground-light leading-6">
                  As {partnerName} tracks in USD, there might be slight discrepancy due to conversion rates.
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground-light mt-2 mr-3 flex-shrink-0" />
                <p className="text-base text-foreground-light leading-6">
                  For {partnerName} purchases, Max Miles are awarded and calculated when bookings is confirmed and e-tickets are issued, i.e. not at point of purchase.
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground-light mt-2 mr-3 flex-shrink-0" />
                <p className="text-base text-foreground-light leading-6">
                  Max Miles calculated based on final price paid online, excluding taxes, fees and service charges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-5 border-t border-gray-100">
          <button
            className="w-full py-3 bg-primary-light text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            onClick={onClose}
          >
            Shop with Max
          </button>
        </div>
      </div>
    </div>
  );
};
