import React from 'react';
import './style/Card.css';

import CardMark from './CardMark';
import CardSuit from './CardSuit';
import Joker from './Joker';

import CardNames from './constants/CardNames';
import CardSuits from './constants/CardSuits';

function makeAce(suit: string) {
    return (
        <div className="ace-content">
            <CardSuit suit={suit} className=""/>
        </div>
    );
}

function makeN_2(suit: string) {
    return (
        <div className="number-content col">
        <div className="number-group">
            <CardSuit suit={suit} className=""/>
        </div>
        <div className="number-group">
            <CardSuit suit={suit} className="upside-down"/>
        </div>
        </div>
    );
}

function makeN_3(suit: string) {
    return (
        <div className="number-content col">
            <div className="number-group">
                <CardSuit suit={suit} className=""/>
            </div>
            <div className="number-group">
                <CardSuit suit={suit} className="center"/>
            </div>
            <div className="number-group">
                <CardSuit suit={suit} className="upside-down"/>
            </div>
        </div>
    );
}

function makeN_4(suit: string) {
    return (
        <div className="number-content col">
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
            </div>
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_5(suit: string) {
    return (
        <div className="number-content col">
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
            </div>
            <div className="number-group">
                <CardSuit suit={suit} className="center"/>
            </div>
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_6(suit: string) {
    return (
        <div className="number-content col">
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
            </div>
            <div className="flex-full vertical-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
            </div>
            <div className="flex-full">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_7(suit: string) {
    return (
        <div className="number-content">
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center"/>
                </div>
                <div className="number-group">
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_8(suit: string) {
    return (
        <div className="number-content">
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_9(suit: string) {
    return (
        <div className="number-content">
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeN_10(suit: string) {
    return (
        <div className="number-content">
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="vertical-center upside-down"/>
                </div>
            </div>
            <div className="flex col horizontal-center">
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="center"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
                <div className="number-group">
                    <CardSuit suit={suit} className="horizontal-center upside-down"/>
                </div>
            </div>
        </div>
    );
}

function makeRoyal(name: string) {
    return (
        <div className="ace-content">
            <div>{name}</div>
        </div>
    );
}

function makeJoker() {
    return (
        <div className="ace-content">
            <Joker />
        </div>
    );
}

type CardPropsType = {
    name?: string,
    suit?: string,
    className?: string,
};
function Card({ name, suit, className }: CardPropsType) {
    
    if (!name || (!suit && '' !== suit)) {
        return <div className={`card ${className}`}/>;
    }
    const isAce = CardNames.isAce(name);
    const isN_2 = CardNames.isN_2(name);
    const isN_3 = CardNames.isN_3(name);
    const isN_4 = CardNames.isN_4(name);
    const isN_5 = CardNames.isN_5(name);
    const isN_6 = CardNames.isN_6(name);
    const isN_7 = CardNames.isN_7(name);
    const isN_8 = CardNames.isN_8(name);
    const isN_9 = CardNames.isN_9(name);
    const isN_10 = CardNames.isN_10(name);
    const isJack = CardNames.isJack(name);
    const isQueen = CardNames.isQueen(name);
    const isKing = CardNames.isKing(name);
    const isJoker = CardNames.isJoker(name);
    const isSomething = isAce || isN_2 || isN_3 || isN_4 || isN_5 || isN_6 || isN_7 || isN_8
      || isN_9 || isN_10 || isJack || isQueen || isKing || isJoker;
    let displayName = isJoker ? 'J' : name;
    return <div className={`card ${className}`}
            //onClick={this.props.onClick}
        >
        {isSomething && <CardMark name={displayName} suit={suit} className=""/>}
        {(isKing || isQueen || isJack) && makeRoyal(name)}
        {isAce && makeAce(suit)}
        {isJoker && makeJoker()}
        {isN_2 && makeN_2(suit)}
        {isN_3 && makeN_3(suit)}
        {isN_4 && makeN_4(suit)}
        {isN_5 && makeN_5(suit)}
        {isN_6 && makeN_6(suit)}
        {isN_7 && makeN_7(suit)}
        {isN_8 && makeN_8(suit)}
        {isN_9 && makeN_9(suit)}
        {isN_10 && makeN_10(suit)}
        {isSomething && <CardMark name={displayName} suit={suit} className="upside-down"/>}
    </div>
}

export default Card;
