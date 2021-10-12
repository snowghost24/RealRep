export function inputReducer(
    state,
    action,
) {
    switch ( action.type ) {
        case action.type:
            // eslint-disable-next-line no-param-reassign
            state[ action.type ] = action.payload;
            return { ...state };
        default:
            return { ...state };
    }
}
