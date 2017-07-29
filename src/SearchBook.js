import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash/debounce'

const MaxSearchResult = 10

class SearchBook extends Component {
	constructor(props, context) {
		super(props, context)
		this.searchBook = debounce(this.searchBook, 200)
	}

	state = {
		searching: false,
		query: '',
		books: []
	}

	handleChange = (event) => {
		this.setState({ query: event.target.value }, this.searchBook)
	}

	searchBook = () => {
		const { query } = this.state
		this.setState({ searching: true })

		BooksAPI.search(query, MaxSearchResult)
			.then(books => {
				this.setState({ books: books || [], searching: false })
			})
			.catch(err => {
				this.setState({ searching: false })
			})
	}

	render() {
		const { query, searching, books } = this.state

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							value={query}
							type="text"
							placeholder="Search by title or author"
							onChange={this.handleChange}
							autoFocus
						/>
					</div>
				</div>
				<div className="search-books-results">
					{searching ? <Loading /> : (
						<ol className="books-grid">
							{books.map(book =>
								<li key={book.industryIdentifiers[0].identifier}>
									<Book book={book} />
								</li>
							)}
						</ol>
					)}
				</div>
			</div>
		)
	}
}

export default SearchBook