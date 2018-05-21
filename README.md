[![Build Status](https://codeship.com/projects/fabb0470-3510-0136-cb1e-1e1a57dc8df8/status?branch=master)
[![Code Climate](https://codeclimate.com/github/ChoiChips/no-time-like-now/badges/gpa.svg)](https://codeclimate.com/github/ChoiChips/no-time-like-now)
[![Coverage Status](https://coveralls.io/repos/github/ChoiChips/no-time-like-now/badge.svg?branch=master)](https://coveralls.io/github/ChoiChips/no-time-like-now?branch=master)

# NO TIME LIKE NOW

Official Site:
https://no-time-like-now.herokuapp.com

Users can browse and respond to writing prompts collected from sources across the web. Goal is to help users overcome writer's block.

## Main Features:
1. Custom authorization requiring users to respond to mandatory daily prompt before allowing access to site. During response users cannot backspace, must meed character/word count minimum, and are locked in modal view.

2. Prompt sources:
* Reddit: Collected writing prompts from /r/WritingPrompts using Reddit API (no NSFW content). Can sort by different categories including "Hot", "Rising", "New", and "Controversial"
* Unsplash: Used Unsplash API (Source) for embedding free high-res photos. Photos are generated randomly.
* Oxford Dictionaries: Used Nokogiri gem to crawl Oxford Dictionaries' "Weird and Wonderful Words" and collected words/definitions into database.

3. User responses are collected and displayed on their profile pages, along with Google Charts visualization of recent activity.

## Front End:
* [React](https://reactjs.org/)
* [Foundation](https://foundation.zurb.com/)
* [Sass](https://sass-lang.com/)

## Back End
* [Ruby on Rails](http://rubyonrails.org/)
* [PostgreSQL](https://www.postgresql.org/)

## In Progress
* Search functionality and pagination
* Auditory prompts and visual responses.
* Combined prompts (writing prompt + photo prompt + random word prompt)

## Acknowledgments:

Thank you to all my mentors and colleagues at Launch Academy!
* [Launch Academy](https://www.launchacademy.com)
