export type ColorOption = {
  id: string
  label: string
  image: string
}

export type CameraProduct = {
  id: string
  name: string
  description: string
  image: string
  colors: ColorOption[]
  originalPrice: number
  salePrice: number
  savePercent?: number
  initialQty: number
}

export const cameras: CameraProduct[] = [
  {
    id: 'cam-v4',
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    image: '/images/wyze-cam-v4.png',
    colors: [
      { id: 'white', label: 'White', image: '/images/cam-v4-white.png' },
      { id: 'grey', label: 'Grey', image: '/images/cam-v4-grey.png' },
      { id: 'black', label: 'Black', image: '/images/cam-v4-black.png' },
    ],
    originalPrice: 35.98,
    salePrice: 27.98,
    savePercent: 22,
    initialQty: 1,
  },
  {
    id: 'cam-pan-v3',
    name: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    image: '/images/wyze-cam-pan-v3.png',
    colors: [
      { id: 'white', label: 'White', image: '/images/pan-v3-white.png' },
      { id: 'black', label: 'Black', image: '/images/pan-v3-black.png' },
    ],
    originalPrice: 39.98,
    salePrice: 34.98,
    savePercent: 12,
    initialQty: 2,
  },
  {
    id: 'floodlight-v2',
    name: 'Wyze Cam Floodlight v2',
    description:
      '2K floodlight camera with a 160° wide-angle view for your garage.',
    image: '/images/floodlight.png',
    colors: [
      { id: 'white', label: 'White', image: '/images/floodlight-white.png' },
      { id: 'black', label: 'Black', image: '/images/floodlight-black.png' },
    ],
    originalPrice: 89.98,
    salePrice: 69.98,
    savePercent: 22,
    initialQty: 0,
  },
  {
    id: 'duo-doorbell',
    name: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the porch protection.',
    image: '/images/duo-cam-doorbell.png',
    colors: [],
    originalPrice: 69.98,
    salePrice: 69.98,
    initialQty: 0,
  },
  {
    id: 'battery-cam-pro',
    name: 'Wyze Battery Cam Pro',
    description:
      'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
    image: '/images/battery-cam-pro-white.png',
    colors: [
      {
        id: 'white',
        label: 'White',
        image: '/images/battery-cam-pro-white.png',
      },
      {
        id: 'black',
        label: 'Black',
        image: '/images/battery-cam-pro-black.png',
      },
    ],
    originalPrice: 89.98,
    salePrice: 89.98,
    initialQty: 0,
  },
]

export type ReviewItem = {
  id: string
  name: string
  image: string
  qty: number
  originalPrice?: number
  price: number
  isFree?: boolean
  required?: boolean
  disabled?: boolean
}

export const reviewCameras: ReviewItem[] = [
  {
    id: 'cam-v4',
    name: 'Wyze Cam v4',
    image: '/images/wyze-cam-v4.png',
    qty: 1,
    originalPrice: 35.98,
    price: 27.98,
  },
  {
    id: 'cam-pan-v3',
    name: 'Wyze Cam Pan v3',
    image: '/images/wyze-cam-pan-v3.png',
    qty: 2,
    originalPrice: 57.98,
    price: 47.98,
  },
]

export const reviewSensors: ReviewItem[] = [
  {
    id: 'motion-sensor',
    name: 'Wyze Sense Motion Sensor',
    image: '/images/wyze-sense-motion-sensor.png',
    qty: 2,
    price: 59.98,
  },
  {
    id: 'sense-hub',
    name: 'Wyze Sense Hub (Required)',
    image: '/images/wyze-sense-hub.png',
    qty: 1,
    originalPrice: 29.92,
    price: 0,
    isFree: true,
    required: true,
    disabled: true,
  },
]

export const reviewAccessories: ReviewItem[] = [
  {
    id: 'microsd',
    name: 'Wyze MicroSD Card (256GB)',
    image: '/images/microsd-card.png',
    qty: 2,
    price: 41.96,
  },
]

export const collapsedSteps = [
  {
    step: 2,
    label: 'Step 2 of 4',
    title: 'Choose your plan',
    icon: '/images/icon-plan-logo.svg',
  },
  {
    step: 3,
    label: 'Step 3 of 4',
    title: 'Choose your sensors',
    icon: '/images/icon-sensors.svg',
  },
  {
    step: 4,
    label: 'Step 4 of 4',
    title: 'Add extra protection',
    icon: '/images/icon-extra-protection.svg',
  },
]
