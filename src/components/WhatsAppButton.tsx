
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

type WhatsAppButtonProps = {
  productName?: string;
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  phoneNumber = "+918910131099", // WhatsApp contact number
  message = "I'd like to inquire about",
  className,
  variant = "default"
}) => {
  const handleWhatsAppClick = () => {
    const whatsappMessage = productName 
      ? `${message} ${productName}`
      : message;
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppClick}
      className={className}
      variant={variant}
    >
      <MessageCircle className="mr-2" />
      Order on WhatsApp
    </Button>
  );
};

export default WhatsAppButton;
