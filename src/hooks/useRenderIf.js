import propTypes from 'prop-types';

function useRenderIf(condition, renderIfTrue, renderIfFalse) {
    if (renderIfFalse === undefined) {
        return condition && renderIfTrue;
    }

    if (renderIfTrue === undefined) {
        return condition || renderIfFalse;
    }

    return condition ? renderIfTrue : renderIfFalse;
}

useRenderIf.propTypes = {
    condition: propTypes.bool,
    renderIfTrue: propTypes.any,
    renderIfFalse: propTypes.any,
};

export default useRenderIf;