"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Truck, Package, CheckCircle, Clock } from "lucide-react"

// Mock data for supply chain orders
const initialOrders = [
  {
    id: "ORD-2023-1001",
    supplier: "MediPharm Ltd",
    items: [
      { name: "Paracetamol 500mg", quantity: 5000 },
      { name: "Ibuprofen 400mg", quantity: 3000 },
    ],
    orderDate: "2023-11-01",
    expectedDelivery: "2023-11-15",
    status: "Delivered",
    trackingNumber: "TRK-MP-10156",
    lastUpdated: "2023-11-15",
  },
  {
    id: "ORD-2023-1002",
    supplier: "PharmaCare Inc",
    items: [
      { name: "Amoxicillin 250mg", quantity: 2000 },
      { name: "Azithromycin 500mg", quantity: 1000 },
    ],
    orderDate: "2023-11-05",
    expectedDelivery: "2023-11-20",
    status: "In Transit",
    trackingNumber: "TRK-PC-20789",
    lastUpdated: "2023-11-12",
  },
  {
    id: "ORD-2023-1003",
    supplier: "DiabeCare Solutions",
    items: [
      { name: "Insulin Glargine", quantity: 500 },
      { name: "Glucose Test Strips", quantity: 5000 },
    ],
    orderDate: "2023-11-08",
    expectedDelivery: "2023-11-22",
    status: "Processing",
    trackingNumber: "TRK-DC-30421",
    lastUpdated: "2023-11-10",
  },
  {
    id: "ORD-2023-1004",
    supplier: "HeartCare Pharma",
    items: [
      { name: "Atorvastatin 20mg", quantity: 3000 },
      { name: "Amlodipine 5mg", quantity: 2000 },
    ],
    orderDate: "2023-11-10",
    expectedDelivery: "2023-11-25",
    status: "Ordered",
    trackingNumber: "TRK-HC-40532",
    lastUpdated: "2023-11-10",
  },
  {
    id: "ORD-2023-1005",
    supplier: "RespiCare Ltd",
    items: [
      { name: "Salbutamol Inhaler", quantity: 1000 },
      { name: "Fluticasone Inhaler", quantity: 800 },
    ],
    orderDate: "2023-11-12",
    expectedDelivery: "2023-11-27",
    status: "Ordered",
    trackingNumber: "TRK-RC-50643",
    lastUpdated: "2023-11-12",
  },
]

// Mock data for shipments
const initialShipments = [
  {
    id: "SHP-2023-2001",
    destination: "City General Hospital",
    items: [
      { name: "Paracetamol 500mg", quantity: 2000 },
      { name: "Ibuprofen 400mg", quantity: 1500 },
    ],
    shipDate: "2023-11-05",
    expectedDelivery: "2023-11-08",
    status: "Delivered",
    trackingNumber: "TRK-OUT-10156",
    lastUpdated: "2023-11-08",
  },
  {
    id: "SHP-2023-2002",
    destination: "Community Health Center",
    items: [
      { name: "Amoxicillin 250mg", quantity: 1000 },
      { name: "Azithromycin 500mg", quantity: 500 },
    ],
    shipDate: "2023-11-07",
    expectedDelivery: "2023-11-10",
    status: "Delivered",
    trackingNumber: "TRK-OUT-20789",
    lastUpdated: "2023-11-10",
  },
  {
    id: "SHP-2023-2003",
    destination: "Diabetes Specialty Clinic",
    items: [
      { name: "Insulin Glargine", quantity: 200 },
      { name: "Glucose Test Strips", quantity: 2000 },
    ],
    shipDate: "2023-11-10",
    expectedDelivery: "2023-11-13",
    status: "In Transit",
    trackingNumber: "TRK-OUT-30421",
    lastUpdated: "2023-11-11",
  },
  {
    id: "SHP-2023-2004",
    destination: "Cardiac Care Hospital",
    items: [
      { name: "Atorvastatin 20mg", quantity: 1500 },
      { name: "Amlodipine 5mg", quantity: 1000 },
    ],
    shipDate: "2023-11-12",
    expectedDelivery: "2023-11-15",
    status: "Processing",
    trackingNumber: "TRK-OUT-40532",
    lastUpdated: "2023-11-12",
  },
  {
    id: "SHP-2023-2005",
    destination: "Respiratory Care Center",
    items: [
      { name: "Salbutamol Inhaler", quantity: 500 },
      { name: "Fluticasone Inhaler", quantity: 400 },
    ],
    shipDate: "2023-11-14",
    expectedDelivery: "2023-11-17",
    status: "Scheduled",
    trackingNumber: "TRK-OUT-50643",
    lastUpdated: "2023-11-14",
  },
]

export function PharmacySupplyChainTracking() {
  const [orders, setOrders] = useState(initialOrders)
  const [shipments, setShipments] = useState(initialShipments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [isShipmentDetailsOpen, setIsShipmentDetailsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('incoming')

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Filter shipments based on search term and status
  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'All' || shipment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Get status badge variant and icon
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { variant: 'success', icon: <CheckCircle className="h-3 w-3 mr-1" /> }
      case 'In Transit':
        return { variant: 'info', icon: <Truck className="h-3 w-3 mr-1" /> }
      case 'Processing':
        return { variant: 'warning', icon: <Package className="h-3 w-3 mr-1" /> }
      case 'Ordered':
      case 'Scheduled':
        return { variant: 'secondary', icon: <Clock className="h-3 w-3 mr-1" /> }
      default:
        return { variant: 'outline', icon: null }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Supply Chain Tracking</CardTitle>
        <CardDescription>
          Track incoming orders from suppliers and outgoing shipments to healthcare facilities
        </CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute
I'll enhance the MediConnect platform by integrating solutions for drug inventory tracking and hospital queue management, focusing on creating a seamless UI across the patient and hospital portals. Let me think through how to approach this.

### Enhancing MediConnect with Drug Inventory Tracking and Hospital Queue Management

I'll enhance the MediConnect platform by adding comprehensive drug inventory tracking and hospital queue management features, along with new user profiles to create a more robust healthcare coordination system.

First, let's create a pharmacy portal layout:

\
