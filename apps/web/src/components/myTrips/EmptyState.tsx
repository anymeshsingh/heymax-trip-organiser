interface EmptyStateProps {
  title: string;
  description: string;
  imagePath?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  imagePath = '/empty-page-illustration.png',
}) => {
  return (
    <div className="flex-1 flex items-center justify-center px-10 pt-20">
      <div className="flex flex-col items-center">
        <img 
          src={imagePath}
          alt="Empty state"
          className="mb-5 w-48 h-48 object-contain"
        />
        <h2 className="text-2xl font-bold text-foreground-light mb-3">{title}</h2>
        <p className="text-base text-secondary-foreground text-center leading-5">
          {description}
        </p>
      </div>
    </div>
  );
};
