export const createUserStore = (set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
});