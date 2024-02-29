import { create } from 'zustand'
import { createOrdersStore } from './orders'


export const useStore = create((...a) => ({
  ...createOrdersStore(...a)
}))