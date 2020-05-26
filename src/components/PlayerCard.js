import React from 'react';
import './PlayerCard.css';

const experience = {
	0: 'Rookie',
	1: '1 year'
};

const PlayerCard = (props) => {
	const { player, selected, selectPlayer, getTradeButton, eligible } = props;
	const {
		first_name,
		last_name,
		jersey_number,
		height_ft,
		height_in,
		position_full,
		weight_lbs,
		years_pro,
	} = player;

	return (
		<div className={`player-card ${selected} ${eligible}`} onClick={() => selectPlayer(player)}>
			<div className="player-name">{`${first_name} ${last_name}`}</div>
			<div className="player-specs">
				<span>{`#${jersey_number}`}</span>
				<span> &#8226; </span>
				<span>{`${position_full}`}</span>
			</div>
			<div className="player-height">{`Height: ${height_ft}"${height_in}`}</div>
			<div className="player-weight">{`Weight: ${weight_lbs} lbs`}</div>
			<div className="player-exp">{`Experience: ${experience[years_pro] || years_pro + ' years'}`}</div>
			{selected && getTradeButton()}
		</div>
	);
}

export default PlayerCard;
