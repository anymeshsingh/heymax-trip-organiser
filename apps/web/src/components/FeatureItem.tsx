interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  iconBackgroundColor?: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  iconBackgroundColor = 'bg-blue-500 bg-opacity-20',
}) => {
  return (
    <div className="flex flex-row mb-8">
      <div className={`w-12 h-12 rounded-xl ${iconBackgroundColor} flex justify-center items-center mr-4`}>
        <img className="w-8 h-8" src={icon} alt={title} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground-dark mb-2">{title}</h3>
        <p className="text-sm text-foreground-dark leading-5">
          {description}
        </p>
      </div>
    </div>
  );
};
