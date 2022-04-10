import React, { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './app.css'
import MoviePage from './pages/MoviePage'

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/movies/:id' component={MoviePage} />
			</Switch>
		</BrowserRouter>
	)
}

export default App
