import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import '../App.css'
import * as BooksAPI from '../utils/BooksAPI'

class BooksApp extends Component {
	state = {
		loaded: false,
		books: []
	}

	componentDidMount() {
		BooksAPI
			.getAll()
			.then(books => this.setState({ books: books, loaded: true }))
			.catch(err => {
				this.setState({ loaded: true })
			})
	}

	handleChangeShelf = (book, newShelf) => {
		BooksAPI
			.update(book, newShelf)
			.then((response) => {
				let books

				if (newShelf === 'none') {
					books = this.state.books.filter(b => b.id !== book.id)
				} else {
					let bookFound = false
					books = this.state.books.map(currentBook => {
						if (currentBook.id === book.id) {
							currentBook.shelf = newShelf
							bookFound = true
						}
						return currentBook
					})

					if (!bookFound) {
						books = [...books, Object.assign({}, book, { shelf: newShelf })]
					}
				}

				this.setState({ books: books })
			})
	}

	render() {
		return (
			<div className="app">
				<Route
					exact path="/"
					render={() => <ListBooks {...this.state} onChangeShelf={this.handleChangeShelf} />}
				/>
				<Route
					path="/search"
					render={() => <SearchBook books={this.state.books} onChangeShelf={this.handleChangeShelf} />} />
			</div>
		)
	}
}

export default BooksApp
