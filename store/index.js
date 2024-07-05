import { create } from 'zustand'
import { createOrdersStore } from './orders'
import {createUserStore} from './user'


export const useStore = create((...a) => ({
  ...createOrdersStore(...a), 
  ...createUserStore(...a)
}))