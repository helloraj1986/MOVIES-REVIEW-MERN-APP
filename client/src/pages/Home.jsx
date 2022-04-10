import React, { useState } from 'react'
import Feed from '../components/feed/Feed'
import Form from '../components/form/Form'
import Navbar from '../components/navbar/Navbar'
import './Home.css'

const Home = () => {
	const [formData, setFormData] = useState({
		title: '',
		desc: '',
		year: '',
		poster: '',
		review: '',
		ageLimit: '',
		genre: '',
		rating: '',
	})
	const [editActive, setEditActive] = useState(false)
	const [getEditId, setGetEditId] = useState('')
	return (
		<>
			<Navbar />
			<div className='contentContainer'>
				<Feed
					formData={formData}
					setFormData={setFormData}
					editActive={editActive}
					setEditActive={setEditActive}
					setGetEditId={setGetEditId}
				/>
				<Form
					formData={formData}
					setFormData={setFormData}
					editActive={editActive}
					setEditActive={setEditActive}
					getEditId={getEditId}
				/>
			</div>
		</>
	)
}

export default Home
