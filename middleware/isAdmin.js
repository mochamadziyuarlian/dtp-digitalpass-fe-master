export default function({ store, redirect }) {
    if (store.state.IsLogin) {
        if (store.state.UserLogin.role.role_name === 'User') {
            return redirect('/');
        }
    }
}
