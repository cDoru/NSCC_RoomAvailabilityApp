# Capstone
Capstone project

This is a branch created by Ryan to refactor and rewrite the findRoom functionality and some laravel items.
A branch will allow review of changes as they will affect a number of core things being worked on by @Nick and @Mike.

Changes Proposed:
- Redesign find available room blade page form to be a resuable component which can be used by my map based locate a room
  - refactor straight php code to use laravel blade template structures
  - redesign controller to not be a resource (we're not doing CRUD on it)
  - trying to fix firefox form issue
  - relocating javascript and jquery assets to be outside of blade files
  
