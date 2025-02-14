export interface Opportunity {
  country: string;
  id: number;
  media: { url: string }[];
  type: string;
  share_price: number;
  currency: string;
  number_of_shares: number;
  title_ar: string;
  title_en: string;
  location_ar: string;
  location_en: string;
  opportunity_type: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  status: string;
  available_shares: number;
  owned_shares: number;
}

export interface CardListProps {
  opportunities: Opportunity[];
}
