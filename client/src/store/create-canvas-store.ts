import { create } from "zustand"
// import axios from "axios"

// interface VenuePlan {
//   title: string
//   json: string
// }

type Store = {
  json: string
  setJson: (json: string) => void
}

const canvasStore = create<Store>()((set) => ({
  json: "",

  setJson: (json: string) => {
    set({ json: json })
  },
}))

export default canvasStore
