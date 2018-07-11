# react-electron-rest-client (RERC)

### A Fast, Intuitive Cross Platform REST Client using React and Electron
REST clients are one of developer's main tools. Although there are great clients out there, I feel there are enough pain points where an alternative, such as RERC can fill the void. 

For the initial version, it is based on the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) as the starting point.

## Main Objectives

#### Simple
There are simple REST clients out there, but some parts of the simple interface are not intuitive. RERC focuses on intuitive UI:

![intuitive interface](https://user-images.githubusercontent.com/5439943/42554895-6282606a-849b-11e8-8601-860848640326.gif)

#### Fast to load
On the other hand, while other REST clients might have nice interfaces, they take forever to load. RERC focuses on fast load times. Real-time load time:

![fast load times](https://user-images.githubusercontent.com/5439943/42554806-1cf0dc5c-849b-11e8-9ef4-e833cb8810ce.gif)

#### Easy to contribute
I think the first two objectives are attainable, but it would take me a long time to achieve. Therefore, I want to keep the codebase easy to contribute to. Hopefully, we can achieve this third goal w/o sacrificing too much in terms of maintainability, scalability, and other best practices.

## Usage
Binary install is coming soon. In the meantime, it is simple to compile from source to run the app. Full instructions are available at the [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) site. Short version is provided below:

### Install

* **Note: requires a node version >= 7 and an npm version >= 4.**

First, clone the repo via git:

```bash
$ git clone --depth=1 https://github.com/johnwoolee/react-electron-rest-client.git your-project-name
```

And then install dependencies with npm.

```bash
$ cd your-project-name
$ npm install
```

### Run

Start the app in the `dev` environment.

```bash
$ npm run dev
```

## Immediate Future
#### Proof of Concept
Right now, I'm focused on getting a simple version in a intuitive UI with minimal features i.e. 
- HTTP Method
- URL
- Response
- Request Body

#### Initial Version
- Make an executable app on Windows and Mac and make sure the performance (mainly load time) is acceptable.
- If performance is unacceptable, ponder alternatives such as starting with incorporating React + Electron from scratch instead of using the Bootstrapped (aka boilerplate) version. 

#### Come up with Roadmap for v1
Possibly add things like:
- ability to save requests
  - into collections
- history
  - collapse/expand all history into dates
  - for performance:
    - load last 10 history items with infinite scroll
    - don't load the history panel until other UI elements are already drawn
- JSON body formatting (something I care about...)
