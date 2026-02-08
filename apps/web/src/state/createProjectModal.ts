import { create } from 'zustand'

interface CreateProjectModalState {
  open: boolean
  setOpen: (open: boolean) => void
  openModal: () => void
  closeModal: () => void
}

export const useCreateProjectModalStore = create<CreateProjectModalState>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}))
