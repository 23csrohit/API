import React from 'react';

export interface Category {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Api {
  name: string;
  description: string; // Short description for cards
  category: string;
  longDescription: string;
  endpoint: string;
  pricing: string;
  documentationUrl: string;
  usageExample: {
    language: string;
    code: string;
  };
}

export interface ApiLog {
  id: string;
  timestamp: string;
  apiName: string;
  endpoint: string;
  status: 'Success' | 'Failed';
  statusCode: number;
  latency: number; // in ms
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  transactionId: string;
}

export interface VehicleDetailsData {
    'Registration No': string;
    'Registered Date': string;
    'Owner Name': string;
    'Vehicle Class': string;
    'Fuel Type': string;
    'Maker / Model': string;
    'Fitness Upto': string;
    'Insurance Upto': string;
    'Registration Authority': string;
}

export interface ClientInfo {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    registrationDate: string;
    accountType: 'Free' | 'Pro' | 'Enterprise';
    apiKeysCount: number;
    totalApiCalls: number;
    walletBalance: number;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    gstin?: string;
    pan?: string;
}

export interface VehicleRecord {
    id: string;
    registrationNo: string;
    ownerName: string;
    registeredDate: string;
    vehicleClass: string;
    fuelType: string;
    makerModel: string;
    fitnessUpto: string;
    insuranceUpto: string;
    registrationAuthority: string;
    searchDate: string;
    location?: {
        city: string;
        state: string;
        pincode?: string;
        latitude?: number;
        longitude?: number;
    };
}
