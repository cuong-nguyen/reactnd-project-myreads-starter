import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ stars = 0, totalRatings }) => {
	return (
		<div className="rating" title={stars}>
			{[1, 2, 3, 4, 5].map((s, index) => (
				<i
					key={index}
					className={`fa ${stars >= s ? "fa-star" : (s - stars === 0.5) ? "fa-star-half-o" : "fa-star-o"}`} aria-hidden="true">
				</i>
			))}
			{totalRatings !== undefined && <span className="total-ratings"> ({totalRatings})</span>}
		</div>
	)
}

Rating.propTypes = {
	stars: PropTypes.number,
	totalRatings: PropTypes.number
}

export default Rating