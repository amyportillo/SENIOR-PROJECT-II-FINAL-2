import Image from "next/image";

type ProductImageProps = {
  imageUrl?: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

export default function ProductImage({ imageUrl, alt, size = "medium", className = "" }: ProductImageProps) {
  const sizes = {
    small: { width: 40, height: 40, containerClass: "w-10 h-10" },
    medium: { width: 200, height: 200, containerClass: "w-full h-48" },
    large: { width: 400, height: 400, containerClass: "w-full h-64" },
  };

  const config = sizes[size];

  if (!imageUrl) {
    return (
      <div className={`${config.containerClass} bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}>
        <span className="text-xs">No image</span>
      </div>
    );
  }

  return <Image src={imageUrl} alt={alt} width={config.width} height={config.height} className={`object-contain ${className}`} unoptimized />;
}
