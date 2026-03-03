export interface Course {
  id: string;
  title: string;
  description: string;
  price: number; // This is the Base/Basic price
  image_url: string;
  duration: string;
  level: string;
  status: string;
  features: string[];
  potentialEarnings?: string;
  selectedTier?: 'Basic' | 'Gold' | 'Premium'; // New field
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  experience: string;
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  course_id?: string;
  created_at: string;
}

export interface CartItem extends Course {
  quantity: number;
}
