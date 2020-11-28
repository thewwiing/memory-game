import React     from 'react';
import PropTypes from "prop-types";

import {bindActionCreators} from "redux";
import {withRouter}         from "react-router-dom";
import {connect}            from "react-redux";


const Results = (props) => {
    const {
        history,
        results
    } = props;
    return (
        <div className='results'>
            <button className='results__btn'
                    onClick={() => history.push('/')}>
                <span>на главную</span>
            </button>

            <h1 className='results__title'>
                Результаты ({results.length})
            </h1>

            {
                results.length > 0 &&
                <div className="results__container">
                    <table>
                        <thead>
                            <tr>
                                <th>Отметка времени</th>
                                <th>Результат</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.map((item, i) => (
                                    <tr key={i}>
                                        <th>{item['date']}</th>
                                        <th>{item['result']}</th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    );
};

Results.propTypes = {
    results: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    results: state.ResultsReducer.results
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(
        {

        }, dispatch
    )
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Results));
