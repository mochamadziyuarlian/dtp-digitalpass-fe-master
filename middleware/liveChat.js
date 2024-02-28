export default function({ store, redirect, route }) {
    let RouteName = route.name;
    if (RouteName === 'publikasi') {
        store.commit('setIsHideLiveChat', true);
    } else {
        store.commit('setIsHideLiveChat', false);
    }
}
