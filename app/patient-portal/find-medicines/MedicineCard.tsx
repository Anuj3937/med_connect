import React from "react";

type Medicine = {
  name: string;
  "price(₹)": string;
  manufacturer_name: string;
  type: string;
  pack_size_label: string;
  short_composition1: string;
  image_url?: string; // optional, for future use
  availability?: string; // optional, for future use
};

const MedicineCard = ({ med }: { med: Medicine }) => (
  <div className="border rounded-lg shadow p-4 flex flex-col items-center w-64 bg-white">
    <img
      src={med.image_url || "https://via.placeholder.com/120x120?text=Medicine"}
      alt={med.name}
      className="mb-2 w-24 h-24 object-contain"
    />
    <h2 className="font-bold text-lg text-center">{med.name}</h2>
    <p className="text-sm text-gray-600 text-center mb-1">{med.manufacturer_name}</p>
    <p className="text-sm text-gray-500 mb-1">{med.pack_size_label}</p>
    <p className="text-green-600 font-semibold mb-1">₹{med["price(₹)"]}</p>
    <p className="text-xs text-gray-400 mb-2">{med.type}</p>
    {/* Availability (hardcoded for now) */}
    <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800 mb-2">
      Available
    </span>
    {/* Composition */}
    <p className="text-xs text-gray-500 text-center">{med.short_composition1}</p>
  </div>
);

export default MedicineCard;
