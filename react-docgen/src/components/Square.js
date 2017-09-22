import React from 'react';
import PropTypes from 'prop-types';

/**
 * A square involving some stuff
 */
class Square extends React.Component {

    render() {
        return (
            <div>
                <h2>Square</h2>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

Square.propTypes =  {
	/**
	 * The text for the square
	 */
    text: PropTypes.string.isRequired
}

export default Square
