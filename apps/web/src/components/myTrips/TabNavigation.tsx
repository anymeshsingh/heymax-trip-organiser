interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    key: string;
    label: string;
  }>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="flex flex-row p-2 justify-center items-center bg-white mx-6 mt-4 rounded-full shadow-lg">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`flex-1 py-3 px-6 rounded-full mx-1.5 transition-colors ${
            activeTab === tab.key 
              ? 'bg-primary-light text-white font-semibold' 
              : 'bg-transparent text-secondary-foreground font-medium'
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
