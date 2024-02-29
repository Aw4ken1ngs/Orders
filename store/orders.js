
export const createOrdersStore = (set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  setOrders: (orders) => set(() => ({ orders })),
})