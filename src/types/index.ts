export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  image_url: string;
  features: string[];
  status: 'available' | 'coming_soon';
  created_at: string;
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
