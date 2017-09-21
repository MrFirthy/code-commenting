import React from 'react';
import PropTypes from 'prop-types';

class ComponentSingle extends React.Component {

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
            const requiredText = propObj.required ? <span className="ComponentDocs-required">REQUIRED</span> : null;
            propNames.push(
                <div key={content} className="ComponentDocs-property">
                    <p>
                        <strong>{sortedRef}:</strong>
                        {propObj.type.name} {requiredText}
                    </p>
                    {propObj.description ? <div className="row"><div className="col-xs-12"><p className="ComponentDocs-description">{propObj.description}</p></div></div> : null}
                </div>
            );
        }

        const cleanName = this.props.component.substring(15);
        return (
            <div className="Doc">
                <h2>{cleanName}</h2>
                <p>{this.props.obj.description}</p>
                {propNames.length ? null : <p className="Doc--noProperties">This component has no properties</p>}
                {propNames}
            </div>
        )
    }
}

ComponentSingle.propTypes = {
    obj: PropTypes.object.isRequired,
    component: PropTypes.string.isRequired,
}

class ComponentDocs extends React.Component {

    render() {
        const coms = [];
        for (const component in this.props.data) {
            const obj = this.props.data[component];
            coms.push(<ComponentSingle component={component} key={component} obj={obj} />);
        }
        return (
            <div>
                <h1>React component docs</h1>
                <p>Below are all of the generated docs for this project's react components.</p>
                {coms}
            </div>
        )
    }
}

ComponentDocs.propTypes =  {
    data: PropTypes.object.isRequired
}

export default ComponentDocs
