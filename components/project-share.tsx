// components/project/project-share.tsx - Enhanced sharing with Shadcn Sonner
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Facebook, Twitter, Mail } from 'lucide-react';
import { toast } from 'sonner'; // Shadcn/UI uses direct sonner import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


interface ProjectShareProps {
  title: string;
  description: string;
  url?: string;
}

export function ProjectShare({ title, description, url = '' }: ProjectShareProps) {
  const [isSharing, setIsSharing] = useState(false);
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleNativeShare = async () => {
    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      } finally {
        setIsSharing(false);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied!', {
        description: 'Project link has been copied to your clipboard.',
      });
    } catch (error) {
      toast.error('Copy failed', {
        description: 'Unable to copy link to clipboard.',
      });
    }
  };

  const socialShares = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this renovation project: ${shareUrl}`)}`,
  };

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    return (
      <Button 
        variant="ghost" 
        onClick={handleNativeShare}
        disabled={isSharing}
        className="hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={socialShares.facebook} target="_blank" rel="noopener noreferrer">
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={socialShares.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={socialShares.email}>
            <Mail className="w-4 h-4 mr-2" />
            Email
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

