import { create } from "zustand";

const useMapStore = create((set) => ({
  selectedLayer: "temp_new",
  setSelectedLayer: (layer) =>
    set({
      selectedLayer: layer,
    }),
}));

export default useMapStore;
