import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import Details from './Details'
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

	updateBook(book, newShelf) {
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

		this.setState({ books })
	}

	updateAllBooks(updatingBooks, newShelf, oldShelf) {
		let books
		books = this.state.books.filter(b => b.shelf !== oldShelf)

		if (newShelf !== 'none') {
			const newBooks = updatingBooks.map(book => {
				book.shelf = newShelf
				return book
			})

			books = books.concat(newBooks)
		}

		this.setState({ books })
	}

	handleChangeShelf = (updatingBooks, newShelf) => {
		const [book, ...moreBooks] = updatingBooks

		BooksAPI
			.updateAll(updatingBooks, newShelf)
			.then(() => {
				if (moreBooks.length) {
					// bulk update
					const oldShelf = book.shelf
					this.updateAllBooks(updatingBooks, newShelf, oldShelf)
				} else {
					this.updateBook(book, newShelf)
				}
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
					render={() => <SearchBook books={this.state.books} onChangeShelf={this.handleChangeShelf} />}
				/>
				<Route
					path="/details/:id"
					render={(props) => <Details {...props} />} />
			</div>
		)
	}
}

export default BooksApp
