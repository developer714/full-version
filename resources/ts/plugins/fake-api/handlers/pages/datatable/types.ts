export interface SalesDetails {
  product: Product
  buyer: Buyer
  date: string
  payment: Payment
}

export interface Product {
  id: number
  name: string
  slug: string
  brand: string
  category: string
  price: number
  image: string
  hasFreeShipping: boolean
  rating: number
  description: string
}

export interface Buyer {
  name: string
  avatar: string | null
}

export interface Payment {
  total: number
  receivedPaymentStatus: string
  paidAmount: number
  status: string
}

export interface Data {
  responsiveId: string
  id: number
  avatar: string
  fullName: string
  post: string
  email: string
  city: string
  startDate: string
  salary: number
  age: string | number
  experience: string
  status: number
}

export interface membersData {
  id: number
  no: number
  recognition_account: string
  member_id: number
  name: string
  email: string
  manager_name: string
  account_number: string
  account_holder: string
  rank: string
  avatar: string
  concierge: string
  recommender_name: string
  phone: string
  branch_id: string
  created_at: string
  suggestion: string
  mountains_and_rivers: number
  cumulative_pv: string | number
  payment_amount: string
  circulation_rate: string
  suspension_of_benefits: string
  zip_code: string
  address: string
  status: number
}

export interface branchData {
  created_at: string
  id: number
  branch_id: string
  branch_name: string
  numberOfMembers: string
  branchManager: string
  cellPhone: string
  phoneNumber: string
  faxNumber: string
  accountNumber: string
  bankName: string
  accountHolder: string
  recommender: string
  memo: string
}
