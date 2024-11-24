import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/Bars/NavBar'
import Footer from './components/Bars/Footer'
import HomePage from './components/Pages/HomePage'
import NotFoundPage from './components/Pages/NotFoundPage'
import AboutPage from './components/Pages/AboutPage'
import ActivitiesListPage from "./components/Pages/ActivitiesListPage"
import ActivityDetailsPage from './components/Pages/ActivityDetailsPage'
import CreateActivity from './components/Functionalities/CreateActivity'
import EventsListPage from './components/Pages/EventsListPage'
import EventDetailsPage from './components/Pages/EventDetailsPage'
import CreateEvent from './components/Pages/CreateEvent'
import EditEvent from './components/Functionalities/EditEvent'
import SignUpPage from './components/Pages/SignUpPage'
import LogInPage from './components/Pages/LogInPage'
import CategoryPage from './components/Pages/CategoryPage'

function App() {
  return (
    <div>
      <NavBar />
      <h1>Out In Portugal</h1>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-page" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />


          {/* Routes for Activities*/}
          <Route path="/api/activities" element={<ActivitiesListPage />} />
          <Route path="/api/activities/create" element={<CreateActivity />} />
          <Route path="/api/activities/:activityId" element={<ActivityDetailsPage />} />
          <Route path="/api/activities/category/:category" element={<CategoryPage />} />


          {/* Routes for Events*/}
          <Route path="/api/events" element={<EventsListPage />} />
          <Route path="/api/events/create" element={<CreateEvent />} />
          <Route path="/api/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/api/events/edit/:eventId" element={<EditEvent />} />

         
          {/* Routes for Users*/}
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/login" element={<LogInPage />} />
  
        </Routes>

        <Footer />
      </div>

    </div>
  )
}

export default App
