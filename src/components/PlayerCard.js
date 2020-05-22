import React from 'react';
import './PlayerCard.css';

const PlayerCard = (props) => {
	const { player, selected, selectPlayer, getTradeButton } = props;
	const {
		first_name,
		last_name,
		jersey_number,
		height_ft,
		height_in,
		position_full,
		weight_lbs,
	} = player;

	return (
		<div className={`player-card ${selected}`} onClick={selectPlayer}>
			<div className="player-name">{`${first_name} ${last_name}`}</div>
			<div className="player-specs">
				<span>{`#${jersey_number}`}</span>
				<span> &#8226; </span>
				<span>{`${position_full}`}</span>
			</div>
			<div className="player-height">{`Height: ${height_ft}"${height_in}`}</div>
			<div className="player-weight">{`Weight: ${weight_lbs} lbs`}</div>
			{selected && getTradeButton()}
		</div>
	);
}

export default PlayerCard;
