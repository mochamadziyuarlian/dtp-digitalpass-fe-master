export default function({ store, redirect }) {
    if (!store.state.IsLogin) {
        return redirect('/login');
    }
}
