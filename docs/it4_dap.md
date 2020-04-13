# Design and Planning

## OO Design

> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g.draw.io) and save the diagram as an image.
> Upload the image and link it in here using this syntax

<!-- TODO: -->

![](it1_dap.assets/2020-02-17-16-06-43.png)

## Wireframe

> One (or a few) simple sketch of how the user interacts with the application.
> This could be a sketch of your user interface.
> You can draw it with hand and insert it here as an image.

<!-- TODO: -->

![](wireframes/iter4.png)

## Iteration Backlog

> List the User Stories that you will implement in this iteration.

* As someone using the app, I would like to be able to view basic information about other people on the app so that I would be more informed about people I'm dealing with.
* As someone using the app, I would like to be able to communicate with specific other users on the app, so that we can work out a deal for a transaction or give each other pertinent information.

## Tasks

> A tentative list of the "to do" in order to successfully complete this iteration.
> This list will change and it is good to keep it updated.
> It does not need to be exhaustive.

### Backend

* Finish auction system
* Notification full integration
* Deploy backend on heroku
* Unit testing for all endpoints and full integration testing

### Frontend

1. Real-time chat support
2. Display user's profile and make it accessible to others
3. Regularly upload user's current location and lazy-Fetch geo-locations from backend
4. Display postings and give user options to view and post bids.
5. Research on how to do unit test on React Native, current plan to set up "Jest" and cover some basic logic for our app.

## Retrospective of Iteration 3

> The retrospective is an opportunity for your team to inspect itself and create a plan for improvements to be enacted during the next iteration. Review what you had done in iteration 1; note things that you have and have not delivered, note the challenges you had, and reflect on how you shall proceed in the next iteration to do a better job.

### 1.what had done

#### back-end

1. Partial map support
2. Basic chat support
3. More additional API endpoints for front end requests

#### front-end

1. Screens that displaying information for chat list and messages in forms of text and images
2. Using Apple map to render the view that displays two user's geo-location
3. Tab views for postings with different status
4. Refactored navigation structure.
5. The registration page now is functional.

### 2. Still need to deliver

1. The basic operations of IOS notification flow is settled, but need specific code for different type of notifications
2. Notification integration between front and back end.

### 3.challenges encountered

#### back-end

1. Third party code is difficult to learn without good documentation
2. Multiple branch being worked on simultaneously with multiple features on each branch made merging difficult.

#### front-end: React native

1. At first we are trying to use Google map, we have problem on setting up the environment, we also tried to use apple map by setting up an xcode project, we finally find out that expo React map support is the best solution.
2. UI design for chat message displaying is the most complex front end design ever, it took us a lot of time to fit all kinds of information into a single page, we applied a lot CSS adjustments.
3. We were adopting the modern design -- "Hooks" in our project which has a different structure compared with traditional class, but most of the example of react native map we found online are using classes, so we did a lot debugging to make the calls of map APIs workable.

### 4.iteration4's plan

#### back-end

1. Complete notification integration with frontend
2. Real-time map support,calculate the distance between buyers and sellers
3. Real-time chat support with notification.
4. Finalize auction system
5. Deploy backend on a reliable server
6. Unit test

#### front-end

1. Real-time chat support
2. Screens that displays user's profile
3. get, upload and display user's geo-location
4. Screens for auction system
5. Setup `Jest` for unit testing

