export interface MembershipPlan {
  id: string
  name: string
  priceLabel: string
  billingLabel: string
  description: string
  features: string[]
  highlighted: boolean
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'single-sport',
    name: 'Single Sport',
    priceLabel: '$89',
    billingLabel: '/month',
    description: 'One athlete, one program at one academy.',
    features: ['Batch-based training & attendance', 'Performance assessments', 'Practice level tracking'],
    highlighted: false,
  },
  {
    id: 'multi-sport',
    name: 'Multi-Sport',
    priceLabel: '$149',
    billingLabel: '/month',
    description: 'One athlete, any program across any academy in the org.',
    features: [
      'Everything in Single Sport',
      'Enroll in multiple sports/academies',
      'Transfer between academies, history kept',
      'Tournament entry included',
    ],
    highlighted: true,
  },
  {
    id: 'elite-family',
    name: 'Elite Family',
    priceLabel: '$259',
    billingLabel: '/month',
    description: 'Up to 3 athletes on one family membership.',
    features: [
      'Everything in Multi-Sport',
      'Up to 3 athlete profiles',
      'Physician sessions included',
      'Priority batch scheduling',
    ],
    highlighted: false,
  },
]
