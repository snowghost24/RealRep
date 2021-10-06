export function inputReducer(
    state,
    action,
) {
    // console.log( 'input reducer state action', action );
    // console.log( 'input reducer state action', action );
    switch ( action.type ) {
        case action.type:
            // eslint-disable-next-line no-param-reassign
            state[ action.type ] = action.payload;
            return { ...state };
        default:
            return { ...state };
    }
}
