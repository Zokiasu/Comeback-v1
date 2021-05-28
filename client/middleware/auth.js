export default async function({$fire, route, redirect}) {
    if(route.path !== '/') {
        await $fire.auth.onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
            } else {
                return redirect('/')
            }
        });
          
    } else if (route.path === '/') {
        await $fire.auth.onAuthStateChanged(function(user) {
            if (user) {
                return redirect(`${$fire.auth.currentUser.uid}/calendar/`)
            }
        });
    }
}