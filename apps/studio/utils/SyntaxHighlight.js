import PropTypes from 'prop-types';


// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({ children, ...others }) {
    return (
      {children}
    );
}

SyntaxHighlight.propTypes = {
    children: PropTypes.node
};
