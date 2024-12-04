// components/LocationTableRow.tsx
'use client';

import React from 'react';

interface Location {
  id: number;
  from_location: string;
  to_destination: string;
  description: string;
  verified: boolean;
}

interface LocationTableRowProps {
  location: Location;
  onVerify: (id: number, verified: boolean) => void;
}

export function LocationTableRow({ location, onVerify }: LocationTableRowProps) {
  return (
    <tr>
      <td className="border border-gray-300 p-2">{location.id}</td>
      <td className="border border-gray-300 p-2">{location.from_location}</td>
      <td className="border border-gray-300 p-2">{location.to_destination}</td>
      <td className="border border-gray-300 p-2">{location.description}</td>
      <td className="border border-gray-300 p-2 text-center">
        <input
          type="checkbox"
          checked={location.verified}
          onChange={(e) => onVerify(location.id, e.target.checked)}
          className="form-checkbox"
        />
      </td>
    </tr>
  );
}