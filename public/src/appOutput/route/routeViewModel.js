import { merge } from 'scalejs';

export default function routeViewModel(node) {
    const route = node.route;
    const text = node.text;

    function setRoute(rt) {
        localStorage.setItem('scalejs_editor_route', rt);
    }

    return merge(node, {
        route,
        text,
        setRoute
    });
}
