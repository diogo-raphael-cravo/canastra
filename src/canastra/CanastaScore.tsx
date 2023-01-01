import React, { useState } from 'react';
import { v4 } from 'uuid';

import { Radio, Modal, Button, Descriptions } from 'antd';

import { useAppSelector, useAppDispatch } from '../Hooks';

import { PlayerType, selectPlayers, selectSequences, SequenceType, selectGoOutPlayer } from '../canastra/slices/GameSlice';
import { CardType } from '../cards/helpers/Decks';
import CardNames from '../cards/helpers/CardNames';
import { setShowScore, selectShowScore } from './slices/CanastaScoreSlice';

const GO_OUT_SCORE = 50;
const LOW_CARD_SCORE = 5;
const HIGH_CARD_SCORE = 10;
const DIRTY_JOKER_SCORE = 20;
const CLEAN_JOKER_SCORE = 50;
const ACE_SCORE = 15;
type SequenceScoreType = {
    sequenceScore: number,
    sequenceCardsScore: number,
};
type ScoreType = {
    goOutScore: number,
    sequences: SequenceScoreType[],
    handPenalty: number,
};
function getCardScore(card: CardType): number {
    if (CardNames.isAce(card.name)) {
        return ACE_SCORE;
    } else if (CardNames.isN_2(card.name)) {
        return DIRTY_JOKER_SCORE;
    } else if (CardNames.isN_3(card.name)
        || CardNames.isN_4(card.name)
        || CardNames.isN_5(card.name)
        || CardNames.isN_6(card.name)
        || CardNames.isN_7(card.name)) {
        return LOW_CARD_SCORE;
    } else if (CardNames.isN_8(card.name)
        || CardNames.isN_9(card.name)
        || CardNames.isN_10(card.name)
        || CardNames.isJack(card.name)
        || CardNames.isQueen(card.name)
        || CardNames.isKing(card.name)) {
        return HIGH_CARD_SCORE;
    } else if (CardNames.isJoker(card.name)) {
        return CLEAN_JOKER_SCORE;
    }
    throw new Error(`unknown card ${card.name}`);
}
function getCardsScore(cards: CardType[]): number {
    return cards.reduce((prev, curr) => prev + getCardScore(curr), 0);
}
function getTotalScore(score: ScoreType): number {
    return score.goOutScore + score.handPenalty + score.sequences
        .reduce((prev, curr) => prev + curr.sequenceCardsScore + curr.sequenceScore, 0);
}
function makeScore(players: PlayerType[], sequences: SequenceType[], goOutPlayer: string | null): ScoreType {
    const hasGoOutPlayer = goOutPlayer && undefined !== players.find(player => player.id === goOutPlayer);
    return {
        goOutScore: hasGoOutPlayer ? GO_OUT_SCORE : 0,
        sequences: sequences.map(sequence => ({
            sequenceCardsScore: getCardsScore(sequence.cards),
            sequenceScore: 0, // TODO: compute right score
        })),
        handPenalty: -players.reduce((prev, curr) => prev + getCardsScore(curr.hand), 0),
    };
}
function CanastaScore() {
    const dispatch = useAppDispatch();

    const showScore = useAppSelector(selectShowScore);
    const handleOk = () => {
      dispatch(setShowScore(false));
    };
    const [showPlayerScore, setShowPlayerScore] = useState(true);

    const players = useAppSelector(selectPlayers);
    const sequences = useAppSelector(selectSequences);
    const goOutPlayer = useAppSelector(selectGoOutPlayer);

    let playersThisTeam = players.filter(player => player.playerTeam === showPlayerScore);
    let sequencesThisTeam = sequences.filter(sequence => sequence.playerTeam === showPlayerScore);

    const score = makeScore(playersThisTeam, sequencesThisTeam, goOutPlayer);

    return (
        <Modal title="Score" open={showScore} onOk={handleOk} onCancel={handleOk} footer={[
            <Button key="ok" onClick={handleOk} type="primary">
              Ok
            </Button>]}>
            <div className="col" style={{ display: 'flex', flex: 1 }}>
                <Radio.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} value={showPlayerScore} onChange={(e) => setShowPlayerScore(e.target.value)}>
                    <Radio.Button value={true}>Próprio / own score</Radio.Button>
                    <Radio.Button value={false}>Opponent score</Radio.Button>
                </Radio.Group>
                <div style={{ marginTop: 20 }}>
                    Batida / go out: {score.goOutScore}
                    <br/>
                    Mãos / hands: {score.handPenalty}
                    <br/>
                    Sequências / sequences: 
                    {score.sequences.map(sequence => {
                        return <div key={v4()}>
                            <br/>
                            Sequência / sequence: {sequence.sequenceScore}
                            <br/>
                            Cartas / cards: {sequence.sequenceCardsScore}
                            <br/>
                        </div>;
                    })}
                    <br/>
                    Total: {getTotalScore(score)}
                </div>
            </div>
        </Modal>
    );
}

export default CanastaScore;
