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
import AnswerBubble from './AnswerBubble';
import Question from './Question';

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
        // THIS is the part where the answer is submitted
        let answer = this.props.numberProps.answer;
        if(event.which == 13) {
            answer(event.currentTarget.value, this.props.numberProps.currentNumber);
        }
    };

    render() {
        const { controls } = this.props;
        const { modes, changeMode, currentMode } = this.props.modeProps;
        const { currentNumber, answer, answerAttempts } = this.props.numberProps;
        this.props.numberProps.currentNumber.digits = 2500;
        const { score, personalBest, remainingTime } = this.props.scoreboardProps;

        //alert(this.props.questionProps.question1);
        const { questionProps } = this.props.questionProps;
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
                                {/*
                                <ScoreBoard score={ score } personalBest={ personalBest } timer={ remainingTime } />
                                 */}
                                <Question question1={this.props.questionProps.question1}
                                          question2={this.props.questionProps.question2}
                                          timer={ remainingTime }/>
                                <div className="bubble bubble--lg bubble--focus">
                                    <div ref="number" className="bubble__inner bubble__inner--pad">
                                        <h2 className="bubble__title zero-bottom">{ currentNumber.digits }</h2>
                                    </div>
                                </div>
                                <div className="bubble--answer-row ">

                                    <AnswerBubble answer={this.props.questionProps.answer1}/>
                                    <AnswerBubble answer={this.props.questionProps.answer2}/>
                                    <AnswerBubble answer={this.props.questionProps.answer3}/>
                                    <AnswerBubble answer={this.props.questionProps.answer4}/>

                                    {/* Comment like this MFer
                                     <input ref="input" type="text" className="window__form-control
                                     window__form-control--push window__form-control--wide zero-bottom"
                                     onKeyUp={ this.handleKeyUp } placeholder="Translate the number above in German" autofocus></input>
                                     */}

                                </div>
                                <p/>
                                <p className="zero-bottom">- Select the best match -</p>
                            </div>
                        </div>
                    </div>
                </div>
            </screen>
        ) 
    };
};

export default NumberArea;