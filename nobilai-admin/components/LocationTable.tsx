// components/LocationTable.tsx
'use client';

import React from 'react';
import { LocationTableRow } from './LocationTableRow';

interface Location {
  id: number;
  from_location: string;
  to_destination: string;
  description: string;
  verified: boolean;
}

interface LocationTableProps {
  locations: Location[];
  onVerify: (id: number, verified: boolean) => void;
}

export function LocationTable({ locations, onVerify }: LocationTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">From</th>
          <th className="border border-gray-300 p-2">To</th>
          <th className="border border-gray-300 p-2">Description</th>
          <th className="border border-gray-300 p-2">Verified</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <LocationTableRow 
            key={location.id} 
            location={location} 
            onVerify={onVerify} 
          />
        ))}
      </tbody>
    </table>
  );
}