# Numberunic

Simple app to change representation of number - from decimal integer to runic. App is deployed using vercel to: https://numberunic.vercel.app/

# Requirements

- user is able to transform integer value _N_ to runic interpretation where _N_ is in range _N> 0 & N ≤ 9999_
- user can see runic interpretation
- user can save image of runic interpretation

# Structure

Paragraph contains brief structure explanation - top level and components level.

## Top level architecture and tech stack

I've decided to use ts (industry standard, this project contains some non-trivial logic so it was much easier to write it this way), react-sweet-state (to share state in multiple ui components, providerless context like state-management tool), next.js (easy to deploy, uses react and create-next-app has less letters than create-react-app), file-saver (easies way to save files, battle tested). Structure of project is presented below:

| Folder      | Description                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| controllers | Extracted shared state used in more than one ui components                                                |
| ui          | Visual components                                                                                         |
| pages       | App uses next.js - very opinionated framework. That is why pages folder is present in top level directory |

## Components level architecture

Ui layer was split into three parts described below:

| Folder | Description                                             |
| ------ | ------------------------------------------------------- |
| canvas | Component responsible for runic representation          |
| input  | Component responsible for decimal number representation |
| common | Shared components registry                              |

Controllers layer contains extracted shared state used in more than one ui components

## Component level architecture

Single ui component is organized as:

| File                   | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| index                  | Entry point containing business logic                                                            |
| \*.module.css          | CSS used in component (note that name pattern is required by next.js)                            |
| utils (_optional_)     | Business logic removed from component definition in order to improve readability and testability |
| messages (_optional_)  | User facing messages                                                                             |
| types (_optional_)     | Types definitions                                                                                |
| constants (_optional_) | Predefined constants needed to perform math operations                                           |
| tests (_optional_)     | Unit tests                                                                                       |

# Additional changes

TS compiler has three non-default options:

- strictNullChecks
- noImplicitAny
- downlevelIteration
- baseUrl

App uses babel - jest requires modules transpilation. Eslint - with default next config.

# How to run it

To start this app run:
`yarn && yarn dev`
or use npm if you are old-school boy. When app is started visit
`http://localhost:3000/`

# How to test/check/lint it

Linting:
`yarn lint`
Testing:
`yarn test`

# TODO

- Insufficient tests coverage
  - Proper testing for runic output
  - Proper testing for integration of UI components
  - Proper testing for controllers
  - Snapshot for constants - to be sure it won't be accidentally changed
