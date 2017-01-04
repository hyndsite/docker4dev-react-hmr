import Promise      from "bluebird";

export default async function fetchComponentState(dispatch, components, params) {

    if (components.length <= 0) return;

    const fetchDataActions = components.reduce((prev, current) => {
        return ((current.WrappedComponent ? current.WrappedComponent.fetchData : []) || [])
            .concat(prev);
    }, []);

    const promises = fetchDataActions.map(action => {
        const actionCreator = action(params);
        const promise = actionCreator(dispatch);
        return promise;
    });

    await Promise.all(promises);
}
