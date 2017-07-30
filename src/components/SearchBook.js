import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import debounce from 'lodash/debounce'

const MaxSearchResult = 10

class SearchBook extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	}

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

		// query is empty, do nothing
		if (!query) return

		this.setState({ searching: true })

		BooksAPI
			.search(query, MaxSearchResult)
			.then(books => {
				this.setState({
					books: this.updateBooksShelfChanger(books),
					searching: false
				})
			})
			.catch(err => {
				this.setState({ searching: false })
			})
	}

	updateBooksShelfChanger = (books = []) => {
		const currentBooks = this.props.books
		return books.map(book => {
			const bookInShelf = currentBooks.find(b => b.id === book.id)
			if (bookInShelf) {
				book.shelf = bookInShelf.shelf
			}
			return book
		})
	}

	handleClearSearch = () => {
		this.setState({ query: '' })
		this.searchBox.focus()
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
							ref={input => { this.searchBox = input }}
							autoFocus
						/>
					</div>
					{query && <a className="clear-search" onClick={this.handleClearSearch}>Clear</a>}
				</div>
				<div className="search-books-results">
					{searching
						? <Loading />
						: (
							<ol className="books-grid">
								{books.map(book =>
									<li key={book.id}>
										<Book book={book} onChangeShelf={this.props.onChangeShelf} />
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