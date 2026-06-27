/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EventCategory = 'Olympics' | 'World Record' | 'Philanthropy';

export interface HistoricalMilestone {
  year: string;
  title: string;
  eventCategory: EventCategory;
  description: string;
  media: string;
}

export interface StadiumProject {
  facilityName: string;
  completionPercentage: number;
  targetHandover: string;
  contractor: string;
  supervisingBody: string;
  latestUpdates: string[];
  gallery: string[];
  status: 'delayed' | 'on-schedule' | 'completed';
}

export interface AthleteResult {
  lane: number;
  name: string;
  country: string;
  split400m?: string;
  split800m?: string;
  time: string;
  status: 'running' | 'finished' | 'dns' | 'dnf';
  currentPosition?: number;
}

export interface LiveEventRace {
  id: string;
  eventName: string;
  category: 'Men' | 'Women';
  distance: string;
  scheduledTime: string;
  status: 'scheduled' | 'live' | 'completed';
  records: {
    meet: string;
    world: string;
  };
  athletes: AthleteResult[];
}

export interface TicketCategory {
  id: string;
  name: string;
  priceKES: number;
  benefits: string[];
  available: number;
}

export interface TicketReservation {
  ticketId: string;
  holderName: string;
  categoryName: string;
  quantity: number;
  totalCost: number;
  qrCode: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
