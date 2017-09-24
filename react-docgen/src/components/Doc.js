import React from 'react';
import PropTypes from 'prop-types';
import './Docs.css';

/**
 * A component to display the information about a single component
 */
class Doc extends React.Component {

    render() {
        function keys(obj) {
            const keys = [];
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        }

        const sortedProps = keys(this.props.obj.props).sort();
        const propNames = [];
        for (const content in sortedProps) {
            const sortedRef = sortedProps[content];
            const propObj = this.props.obj.props[sortedRef];
            const requiredText = propObj.required ? <span className="Doc--required">REQUIRED</span> : null;
            propNames.push(
                <div key={content} className="Doc--property">
                    <h3>{sortedRef}</h3>
                    <p>
                        Type: <strong>{propObj.type.name}</strong> {requiredText}
                    </p>
                    {propObj.description ? <p className="Doc--description">{propObj.description}</p> : null}
                </div>
            );
        }

        const cleanName = this.props.component.substring(15);
        return (
            <div className="Doc">
                <h2>{cleanName}</h2>
                <p className="Doc--description">{this.props.obj.description}</p>
                {propNames.length ? null : <p className="Doc--noProperties">This component has no properties</p>}
                {propNames}
            </div>
        )
    }
}

Doc.propTypes = {
    /**
     * The object containing information about the Doc
     */
    obj: PropTypes.object.isRequired,
    /**
     * The name of the component
     */
    component: PropTypes.string.isRequired,
}

export default Doc
