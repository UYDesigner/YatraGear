import { Button } from '@/components/ui/button'
import { StarIcon } from 'lucide-react'
import React from 'react'

const StarReview = ({ rating, handleRatingChange }) => {
  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="outline"
          size="icon"
          className={`p-2 rounded-full transition-colors border-none hover:bg-yellow-100`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          onClick={() => handleRatingChange?.(star)}
        >
          <StarIcon
            className={`w-6 h-6 ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarReview;
