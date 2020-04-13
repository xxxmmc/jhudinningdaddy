# Requirement Specification Document

## Problem Statement

> Write a few sentences that describes the problem you are trying to solve. In other words, justify why this software project is needed.

There are many freshman and sophomore students who finish their semesters without using all of their dining dollars. This leads to wasted money, and in many cases the studnents could not even opt out due to required meal plan.

## Potential Clients

> Who are affected by this problem (and would benefit from the proposed solution)? I.e. the potential users of the software you are going to build.

The freshman and sophomore students of JHU would benefit by trading their dining dollars for cash, while the upperclassmans or just any student without dinning dollars can get access to things bought with dinning dollars with potential cheaper prices or easier shopping experience.

## Proposed Solution

> Write a few sentences that describes how a software solution will solve the problem described above.

We propose building an app that allows the sellers and buyers of dining dollars to find eachother and trade. An app will facilitate the contact of sellers and buyers, which would have been nearly impossible to do at scale without a software.

## Functional Requirements

> List the (functional) requirements that software needs to have in order to solve the problem stated above. It is useful to write the requirements in form of **User Stories** and group them into those that are essential (must have), and those which are non-essential (but nice to have).

### Must have

- As someone using the app, I would like to be able to register and sign in using my JHU email so that I know everyone on the app is part of the JHU community.
- (*) As someone using the app, I would like to be able to view basic information about other people on the app so that I would be more informed about people I'm dealing with.
- (*) As someone with Dining Dollars, I would want to be able to advertise my service of being willing to buy and resell items for cash, so that people know I am willing to provide my service.
- (*) As someone without Dining Dollars, I would want to be able to advertise my willingness to buy items for cash, so that people know I am willing to accept their service.
- (*) As someone with Dining Dollars, I would want to be able to accept and communicate with someone advertising their willingness to buy items with cash, so that we can enter a transaction.
- (*) As someone without Dining Dollars, I would like to be able to accept and enlist the service of buying and reselling items, so that we can enter a transaction.
- As someone using the app, I would like to be able to communicate with specific other users on the app, so that we can work out a deal for a transaction or give each other pertinent information.
- As someone using the app, I would like to be able to see a trustworthiness rating for specific other users on the app, so I would be more informed about who I am dealing with.
- As someone who has accepted a transaction, I would like to be able to easily communicate with the user on the other end of the transaction, so we can give each other pertinent information.
- As someone who has accepted a transaction, I would like to be able to rate the trustworthiness of user on the other end of the transaction, so they would be incentivized to act honestly.
- As someone who has accepted a transaction, I would like to be able to report the user on the other end of the transaction should they make some aggregious offense, so they would be incentivized to act honestly, and to keep the community safe and honest.
- (*) As a freshman student with remaining dining dollars in my card, I would like to list how much dining dollar I have so that I am able to trade it for cash with someone who want to use my dining dollars.
- (*) As a junior without dining dollars, I would like someone else to buy things at charles market with dining dollar for me while I pay him in cash.
- As a junior buying items from charles market, I would like to see how many people are currently available for contact near charles market so that I am able to quickly buy anything I need.
- As a freshman selling dining dollars, I would like to get notified when someone wish to contact me to buy my dining dollars so that I am able to sell whenever there is an opportunity.
- As a buying of dining dollars, I would like to be able to contact someone that is selling dining dollars so I can quickly buy anything I need.

### Nice to have

- As someone with Dining Dollars in a transaction, it would be nice to have a mechanism to keep the other side honest to the agreement after I pay for an item using Dining Dollars, so that I would not be scammed or trolled.
- As someone without Dining Dollars in a transaction, it would be nice to have a mechanism to keep the other side honset to the agreement before I buy an item from them using cash, so that I would not be scammed or trolled.
- As someone in a transaction, it would be nice to be able to see the location of the other person on a map, so we don't have to both be in the same place necessarily at the moment of purchase using Dining Dollars.
- As someone using the app, it would be nice to be able to advertise future willingness for transactions and schedule transactions ahead of time, so I would have more freedom regarding the time and location of transaction.
- As a general user of the app, I would like to add someone as friend so I can trade more with people who I know is trustworthy.
- As a general user of the app, I would like to rate a trading experience so that I can let others know if someone is trustworthy.
- As a general user of the app, I would like to see the general rating of someone so that I can avoid any trolls.
- As a general user of the app, I would like to report someone for not showing up or not paying up so that I can remove the trolls or the untrustworthy traders.

## Software Architecture

> Will this be a Web/desktop/mobile (all, or some other kind of) application? Would it conform to the Client-Server software architecture?

This will be a mobile application, and it will conform to the client-server software architecture where a backend stores the user profiles and their data and process the requests for trading and other queries, while the frontend mobile app is easy to use and very minimal in complexity.
