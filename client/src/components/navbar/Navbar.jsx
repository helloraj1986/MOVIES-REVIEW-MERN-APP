import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
	const [searchQuery, setSearchQuery] = useState('')
	const handleSearch = (e) => {
		setSearchQuery(e.target.value)
	}
	return (
		<div className='navbar'>
			<div className='navbarWrapper'>
				<Link to='/' className='logo'>
					<h3>Movie Review</h3>
				</Link>
				<label htmlFor='searchbox' name='searchbox' style={{ display: 'none' }}>
					Search
				</label>
				<input
					type='text'
					value={searchQuery}
					id='searchbox'
					name='searchbox'
					placeholder='Search Movie'
					onChange={handleSearch}
				/>
			</div>
		</div>
	)
}
