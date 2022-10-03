import resso from 'resso';

export const stateStore = resso({
    page :0,
    nextPage: () => stateStore.page++,

})