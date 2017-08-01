import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
	state = {
		selectedShelf: this.props.books[0].shelf,
		books: this.props.books
	}

	handleOnShelfChange = ({ target }) => {
		const selectedShelf = target.options[target.selectedIndex].value
		this.props.onChangeShelf(this.state.books, selectedShelf)
		this.setState({ selectedShelf })
	}

	render() {
		const { length: noOfBooks } = this.props.books
		const { selectedShelf } = this.state

		return (
			<div className="book-shelf-changer">
				<select
					value={selectedShelf}
					onChange={this.handleOnShelfChange}
				>
					<option value="none" disabled>{noOfBooks === 1 ? 'Move to...' : 'Move all to...'}</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		)
	}
}

BookShelfChanger.propTypes = {
	books: PropTypes.array,
	onChangeShelf: PropTypes.func.isRequired
}

export default BookShelfChanger