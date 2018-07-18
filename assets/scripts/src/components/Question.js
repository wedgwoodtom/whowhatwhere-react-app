// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Utilities
import { whichAnimationEvent, addAnimation } from '../libs/utils';
import classNames from 'classnames';

class Question extends Component {

    componentWillReceiveProps(nextProps) {
    };

    render() {
        const { question1, question2, timer } = this.props;
        const timerClass = classNames({
            'flash-text': (timer / 1000) <= 10,
        });

        return (
            <question>
                <div ref="question1" className="bubble bubble--sm bubble--personalbest">
                    <div className="bubble__inner">
                        <h3 className="bubble__desc">{question1}</h3>
                    </div>
                </div>
                <div ref="question2" className="bubble bubble--sm bubble--score">
                    <div className="bubble__inner">
                        <h3 className="bubble__desc">{question2}</h3>
                    </div>
                </div>

                <div ref="timer" className="bubble bubble--sm bubble--timer">
                    <div className="bubble__inner">
                        <h3 className="bubble__desc">Timer</h3>
                        <span className={ timerClass }>{ timer / 1000 }s</span>
                    </div>
                </div>


            </question>
        )
    };
};

export default Question;