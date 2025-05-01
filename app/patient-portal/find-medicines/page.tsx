"use client";
import React, { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";

type Medicine = {
  name: string;
  "price(₹)": string;
  manufacturer_name: string;
  type: string;
  pack_size_label: string;
  short_composition1: string;
  imageUrl?: string;
  availability?: string;
};

export default function MedicineListPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let url = "http://127.0.0.1:5000/api/medicines";
    if (search) url += `?q=${encodeURIComponent(search)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Medicines</h1>
      <input
        type="text"
        placeholder="Search medicine"
        value={search}
        onChange={(e) => {
          setLoading(true);
          setSearch(e.target.value);
        }}
        className="border px-2 py-1 mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((med, idx) => (
            <MedicineCard key={idx} med={med} />
          ))}
        </div>
      )}
    </div>
  );
}
