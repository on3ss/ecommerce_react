const calculateDiscountedPrice = (price: number, percentage: number) => (price - (price * (percentage / 100))).toFixed(2)

export default calculateDiscountedPrice