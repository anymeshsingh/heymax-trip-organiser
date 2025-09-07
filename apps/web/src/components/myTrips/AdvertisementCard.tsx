import { useState } from 'react';
import { TermsModal } from '../modals/TermsModal';

export const AdvertisementCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'activities'>('hotels');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{
    name: string;
    logo: string;
    backgroundColor: string;
  } | null>(null);

  const partners = [
    {
      name: 'Trip.com',
      logo: '/ads/ad1.png',
      backgroundColor: '#2446FF',
      hasBestDeal: true,
    },
    {
      name: 'Klook',
      logo: '/ads/ad2.png',
      backgroundColor: '#4D40CC',
      hasBestDeal: false,
    },
    {
      name: 'Traveloka',
      logo: '/ads/ad3.png',
      backgroundColor: '#008EFF',
      hasBestDeal: false,
    },
  ];

  const handlePartnerPress = (partner: typeof partners[0]) => {
    setSelectedPartner(partner);
    setShowTermsModal(true);
  };

  return (
    <div className="bg-[#FEF5E5] rounded-xl p-4 mb-4">
      <h3 className="text-base font-bold text-[#9F690C] mb-3">Enjoy exclusive upsizes</h3>
      
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-full mr-2 text-sm font-semibold transition-colors ${
            activeTab === 'hotels' 
              ? 'bg-primary-light text-white' 
              : 'bg-white text-secondary-foreground'
          }`}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === 'activities' 
              ? 'bg-primary-light text-white' 
              : 'bg-white text-secondary-foreground'
          }`}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
      </div>

      {/* Partners */}
      <div className="flex justify-between">
        {partners.map((partner, index) => (
          <button
            key={index}
            className="flex flex-col items-center flex-1 mx-1 relative"
            onClick={() => handlePartnerPress(partner)}
          >
            <div 
              className="w-20 h-16 rounded-xl flex items-center justify-center mb-2 relative"
              style={{ backgroundColor: partner.backgroundColor }}
            >
              <img 
                src={partner.logo}
                alt={partner.name}
                className="w-4/5 h-4/5 object-contain"
              />
              {partner.hasBestDeal && (
                <div className="absolute -top-1 -left-1 bg-green-600 px-2 py-0.5 rounded text-white text-xs font-semibold">
                  Best deal
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-foreground-light mb-1">{partner.name}</span>
            <div className="flex items-center">
              <img 
                src="/icons/heymax-icon.png"
                alt="HeyMax"
                className="w-3 h-3 mr-1"
              />
              <span className="text-xs text-primary-light">4.25/SGD</span>
            </div>
          </button>
        ))}
      </div>

      {/* Terms Modal */}
      {selectedPartner && (
        <TermsModal
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          partnerName={selectedPartner.name}
          partnerLogo={selectedPartner.logo}
          logoBackgroundColor={selectedPartner.backgroundColor}
        />
      )}
    </div>
  );
};
