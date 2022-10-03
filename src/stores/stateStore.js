import resso from "resso";

export const stateStore = resso({
  page: 1,
  nextPage: () => stateStore.page++,
  prevPage: () => stateStore.page--,
  setPage: (pageIndex) => (stateStore.page = pageIndex),
});
