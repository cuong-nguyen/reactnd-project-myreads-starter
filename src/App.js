import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import './App.css'

const BooksApp = (props) => {
	return (
		<div className="app">
			<Route exact path="/" component={ListBooks} />
			<Route path="/search" component={SearchBook} />
		</div>
	)
}

export default BooksApp
