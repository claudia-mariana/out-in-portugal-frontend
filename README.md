## Description
OutInPortugal is an App that displays outdoor activities in Portugal and events to attend.

Is an React+Vite App built with Javascript, React, HTML, CSS. The backend of this app was builted with Express API.

This is the repository for the frontend part of OutInPortugal.


## Structure
- NavBar: to navigate trough the app.
- HomePage: main page with categories of activities and some events related to those activities. If you click one category of activities, it will display the existing activities (CategoryPage) for that category. 
- SignUpPage: where the user can create an account, that will allow him to add outdoor activities to the App and create, edit and delete events. If the user signs up, the logIn is automatic.
- LogInPage: where the user that already has an account logs in.
- ActivitiesListPage: displays the list of existing activities. This page is public, as all the other pages that display a list of activities or events and the pages that display specific details about an activity or event. 
- ActivityDetailsPage: displays all the information about a specific activity and has a button to create an activity
- CreateActivity: it has a form to create a new activity, possibility that the user has if is logged in.
- EventsListPage:  displays a list of events related the outdoor activities. This page is also public, the user doesn't need to have an account or log in to see the events or the details about them. On this page, if the user is logged in, each EventCard will present a button to delete, but the user will only be authorized to delete the events that he created - that he owns.
- EventDetailsPage: displays all the information about a specific event and displays a button to create an event. On this page, if the user is logged in and is the owner of the current Event, the page will display a button to edit.
- EditEvent: it has a form to edit the event, if he is the owner of the of the event.
- CreateEvent: here you can create a new event, possibility that the user has if is logged in.
- AboutPage: displays information about the OutInPortugal App and information about Claudia and Mariana.
- Footer: it displays a link to the GitHub repository (frontend) of this app, a link to Claudia's Git Hub profile and a link to Mariana's Git Hub Profile.
- NotFoundPage: a page that displays for all the unknown paths/routes.


# Demo
- https://out-in-portugal.netlify.app/
- to test the API: https://out-in-portugal.onrender.com/


# Git-Hub Repository
- Frontend: https://github.com/claudia-mariana/out-in-portugal-frontend
- Backend: https://github.com/claudia-mariana/out-in-portugal-backend

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
