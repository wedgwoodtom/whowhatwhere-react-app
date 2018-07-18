// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Utilities
import { addAnimation } from '../libs/utils';
import classNames from 'classnames';

// Components
import ScoreBoard from './ScoreBoard';
import ModeSwitcher from './ModeSwitcher';
import GameControls from './GameControls';

class NumberArea extends Component {

    componentDidMount() {
        // Focus input on mount
        // ReactDOM.findDOMNode(this.refs.input).focus();
    };

    componentWillReceiveProps(nextProps) {
        // If new number is given, clear input
        if(this.props.numberProps.currentNumber != nextProps.numberProps.currentNumber) {
            ReactDOM.findDOMNode(this.refs.input).value = '';

            let number = ReactDOM.findDOMNode(this.refs.number);
            addAnimation(number, 'fade-in');
        }
    };
    
    /**
     * Return a percentage of a string as a clue to the answer
     * @param  {string} string  String to create clue from
     * @param  {Number} percent Percent of string to show in clue
     * @return {string}         Clue e.g. 'Dreiun...'
     */
    createClue = (string, percent = 0.4) => {
        let strArr = string.split('');
        let charCount = Math.floor(strArr.length * percent);

        let clueString = strArr.filter(function(val, index){
            return (index < charCount) ? true : false; 
        }).join('');

        return clueString + '...';
    };

    /**
     * Handle what happens when a user submits a repsonse
     * @param  {Object} event Reference to key event
     * @return
     */
    handleKeyUp = (event) => {
        let answer = this.props.numberProps.answer;
        if(event.which == 13) {
            answer(event.currentTarget.value, this.props.numberProps.currentNumber);
        }
    };

    render() {
        const { controls } = this.props;
        const { modes, changeMode, currentMode } = this.props.modeProps;
        const { currentNumber, answer, answerAttempts } = this.props.numberProps;
        const { score, personalBest, remainingTime } = this.props.scoreboardProps;
    
        return (
            <screen>
                <header className="header fade-in">
                    <GameControls controls={ controls } />
                    <ModeSwitcher modes={ modes } changeMode={ changeMode } currentMode={ currentMode }/>
                </header>
                <div className="window__area fade-in">
                    <div className="window__container">
                        <div className="window__outer">
                            <div className="window__inner">
                                <ScoreBoard score={ score } personalBest={ personalBest } timer={ remainingTime } />
                                <div className="bubble bubble--lg bubble--focus">
                                    <div ref="number" className="bubble__inner bubble__inner--pad">
                                        { answerAttempts >= 3 && currentMode !== 'Cheat' &&
                                            <p className="bubble__desc bubble__desc--offset-top bubble__desc--constrained"><strong>Clue:</strong> { this.createClue(currentNumber.answerLanguage)  }</p>
                                        }
                                        { currentMode === 'Cheat' &&
                                            <p className="bubble__desc bubble__desc--offset-top bubble__desc--constrained"><strong>Answer:</strong> { currentNumber.answerLanguage }</p>
                                        }
                                        <h2 className="bubble__title zero-bottom">{ currentNumber.digits }</h2>
                                        <p className="bubble__desc bubble__desc--offset-bottom bubble__desc--constrained">{ currentNumber.questionLanguage }</p>
                                    </div>
                                </div>
                                <div className="bubble--answer-row ">
                                    <div ref="answer1" className="bubble bubble--sm bubble--answer">
                                        <div className="bubble__inner">
                                            <h3 className="bubble__desc">Answer 1</h3>
                                        </div>
                                    </div>

                                    <div ref="answer2" className="bubble bubble--sm bubble--answer">
                                        <div className="bubble__inner">
                                            <h3 className="bubble__desc">Answer 2</h3>
                                        </div>
                                    </div>

                                    <div ref="answer2" className="bubble bubble--sm bubble--answer">
                                        <div className="bubble__inner">
                                            <h3 className="bubble__desc">Answer 3</h3>
                                        </div>
                                    </div>

                                    <div ref="answer2" className="bubble bubble--sm bubble--answer">
                                        <div className="bubble__inner">
                                            <h3 className="bubble__desc">Answer 4</h3>
                                        </div>
                                    </div>

                                    <div ref="answer2" className="bubble bubble--sm bubble--answer">
                                        <div className="bubble__inner">
                                            <h3 className="bubble__desc">Answer 5</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </screen>
        ) 
    };
};

export default NumberArea;