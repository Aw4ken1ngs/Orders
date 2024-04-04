
export const createOrdersStore = (set) => ({
  orders: [],
  showOrderModal: false,
  selectedOrder: null,
  setSelectedOrder: (order) => set(() => ({ selectedOrder: order })),
  setOpenOrderModal: (isVisible) => set(() => ({ showOrderModal: isVisible })),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  setOrders: (orders) => set(() => ({ orders })),
})