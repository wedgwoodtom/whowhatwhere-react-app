// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Utilities
import { whichAnimationEvent, addAnimation } from '../libs/utils';
import classNames from 'classnames';

class AnswerBubble extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hovering: false,
            answer: props.answer
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        //let score = ReactDOM.findDOMNode(this.refs.score);
        //addAnimation(this, 'pulse');
    };

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        alert(this.state.answer);

        //let me = ReactDOM.findDOMNode(this);
        //addAnimation(me, 'pulse');
    }

    render() {
        let style = {
            backgroundColor: this.state.hovering ? "purple" : undefined
            };

        const handleMouseEnter = () => this.setState({hovering : true});
        const handleMouseLeave = () => this.setState({hovering : false});

        return (
            <answer>
                <div ref="answer2" className="bubble bubble--sm bubble--answer"
                     style={style}
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     onClick={ this.handleClick }
                    >
                    <div className="bubble__inner">
                        <h3 className="bubble__desc">{this.state.answer}</h3>
                    </div>
                </div>
            </answer>
        );
    }

};

export default AnswerBubble;