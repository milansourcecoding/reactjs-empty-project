--------------------------------------------------------------------------------------------------------------------------
SCRUM:

Project Owner	- Klijent ili Osoba koja ima direktan kontakt sa klijentom
Team Leader		- Osoba koja upravlja sa zadacima i resava probleme na koje tim nailazi prilikom razvoja
Scrum tim		- Razvojni tim
Sprint			- Vremenski period od ponedeljka do petaka
Dnevni Scrum	- Svakodnevni kratki izvestaj o radu
Retrospektiva	- Pregled sprinta i dogovaranje za sledeci sprint

--------------------------------------------------------------------------------------------------------------------------
SERVER:

Local		- Server za razvoj u lokalhostu
Staging		- Online server za razvoj
Production	- Online server na kome se uploaduje pravi sajt

--------------------------------------------------------------------------------------------------------------------------
TRELLO:

Bug			- Lista sa pronadjenim greskama prilikom testiranja
To Do		- Lista sa zadacima za trenutni sprint
Doing		- Zadaci na kojima se trenutno radi
Done		- Zavrseni zadaci koji su jos uvek u lokalu
Staging		- Zavrseni zadaci koji se nalaze na staging serveru
Released	- Zavrseni i publishovani zadaci na production server
Archived	- Zavrseni i publishovani zadaci koji su prosli testiranje

--------------------------------------------------------------------------------------------------------------------------
GIT-FLOW:

develop	- Grana za razvoj
feature	- Novi feature se kreira iz develop grane i zluzi za razvijanje stvari koje oduzimaju vise vremena
master	- Grana sa stabilnim verzijama
hotfix	- Hotfix se kreira iz master grane i sluzi za popravku bagova koji ce se primeniti i na master i na develop granu

--------------------------------------------------------------------------------------------------------------------------
COMMIT MESSAGE:

- Fix xxx in xxxx page
- Update xxxx in xxxx module
- Create xxx function in xxxx page

--------------------------------------------------------------------------------------------------------------------------
VERZIJA:

X.0.0 -> Novi projekat
1.X.0 -> Build to prod (Spajanje iz develop u master)
1.0.X -> hotfix

--------------------------------------------------------------------------------------------------------------------------
IMENOVANJE:

Function names		- Camel Case (initFunction)
Variable names		- Camel Case (variableName)
CSS class name		- Hyphen Delimited Strings - BEM — Block Element Modifier (button-success-green)
ID of an element	- Underscore delimiter (element_id)
Folder				- Camel Case (layout, pageName)
File				- Pascal Case (ComponentName)

--------------------------------------------------------------------------------------------------------------------------
STRUKTURA REACT PROJEKTA:

src
 |-api
	|-Auth.jsx
	|-ApiCRUD.jsx
 |-utils
	|-Utils.jsx
	|-Enums.jsx
 |-assets
	|-img
		|-img1.png
		|-img2.png
	|-scss
		|-components
			|-component1.scss
			|-component2.scss
			|-elements
				|-button.scss
				|-input.scss
			|-plugin
				|-owlCarousel.scss
		|-layout
			|-mainLayout.scss
			|-header.scss
			|-footer.scss
		|-page
			|-home.scss
			|-login.scss
		|-variables.scss
		|-main.scss
 |-layout
	|-MainLayout.jsx
	|-RouteLayout.jsx
	|-Header.jsx
	|-Footer.jsx
 |-components
	|-button
		|-Button1.jsx
		|-Button2.jsx
	|-input
		|-Input1.jsx
		|-Input2.jsx
 |-views
	|-account
		|-SignIn.jsx
		|-SignUp.jsx
	|-home
		|-Home.jsx
App.jsx
index.jsx

--------------------------------------------------------------------------------------------------------------------------
KREIRANJE REACT PROJEKTA:


Instaliraj ESLint ekstenziju za nalazenje gresaka za VS Code
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Multi Layouts
http://www.uxshaper.com/different-layouts-with-react-router/

Prosledjivanje globalnih podataka ostallim componentama (Autentifikacija korisnika)
https://www.taniarascia.com/using-context-api-in-react/



Instaliraj NODE | NPM | GIT
node --version
npm --version
git --version



Instaliraj modul za kreiranje react applikacije:
npm install -g create-react-app

Kreiranje react applikacije
U direktorijumu gde zelimo da kreiramo projekat kreirace se folder 'my-app'
https://create-react-app.dev/docs/getting-started/
create-react-app my-app --use-npm

Pokretanje react servera
Pristupimo folderu 'my-app' i startujemo server
cd my-app
npm start

Pokretanje projekta u VS Code
Pristupiti projetku u CMD
code .



Instaliraj u folderu od projekta modul za rutiranje stranica
https://www.npmjs.com/package/react-router-dom
npm install --save react-router-dom

Instaliraj u folderu od projekta SCSS modul
src/App.css to src/App.scss | update in src/App.js file -> import src/App.scss
https://create-react-app.dev/docs/adding-a-sass-stylesheet/
npm install node-sass --save

Instaliraj u folderu od projekta Material Icons modul
@import "~material-design-icons/iconfont/material-icons.css"; (Dodaj u main.scss)
<i className='material-icons'>close</i>
npm install material-design-icons

Instaliraj u folderu od projekta Font Awesome Icons modul
Moze se linkovati CDN verzija u main.scss i da se ne instalira modul
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css');
https://www.npmjs.com/package/react-fontawesome
npm install --save react-fontawesome

Instaliraj u folderu od projekta Bootstrap modul
https://react-bootstrap.github.io/getting-started/introduction/
npm install react-bootstrap bootstrap

Instaliraj u folderu od projekta storybook modul za testiranje komponenti
https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/
cd my-app
npx -p @storybook/cli sb init
npm run storybook

--------------------------------------------------------------------------------------------------------------------------

import React, { Component } from 'react';

/**
 * Code structure (same or similar on each page)
 */
 
class EmptyPage extends Component {
    constructor(props) {
        super(props);
        
		// Variables is defined here
		let title = props.title ? props.title : '';
		this.id = (props.id && props.id > 0) ? props.id : null;
	  
		this.state = {
			isLoading: false,
			id: id,
			data: [],
		}
    }


	// this is called only the first time
	componentDidMount() {
        this.callApiFunction(this.state.id);
    }
	
	// changes that are passed to this component in props are detected here
	componentWillReceiveProps(nextProps) {
		if (nextProps.title !== this.state.title) {
			let title = nextProps.title ? nextProps.title : '';
			this.setState({
				title: title
			});
		}
	}
    
	
	/* API calling functions is here */
	callApiFunction = (id) => {
		...
		
		this.setState({
			isLoading: false,
			data: dataFromAPI,
		}, () => {
			if(this.props.onFinishAPI){
				this.props.onFinishAPI(dataFromAPI);
			}
		});
	}
	/* END API */
	
	
	/* FUNCTIONS */
	printTitle = () => {
		return <div>{this.state.title}</div>
	}
	printData = () => {
		return <div>{this.state.data}</div>
	}
	printLoading = () => {
		return <div>Loading ...</div>
	}
	/* FUNCTIONS */
	
	
    render() {
        return <div>
            {this.printTitle()}
            {
				this.state.isLoading 
				?
				this.printLoading()
				:
				this.printData()
			}
        </div>
    }
}

export default EmptyPage;

--------------------------------------------------------------------------------------------------------------------------

import React from 'react';


const EmptyPage = React.forwardRef((props, ref) => {
    const [title, setTitle] = React.useState(props.title ? props.title : '');
	
	React.useImperativeHandle(
        ref,
        () => ({
            getTitle() {
                return title;
            },
         }),
    );
	
    React.useEffect(() => {
        setTitle(props.title ? props.title : '');
    }, [title]);


    return (
        <div>
            
        </div>
    );
});


export default EmptyPage;

--------------------------------------------------------------------------------------------------------------------------
EMPTY PROJECT:

https://github.com/milansourcecoding/reactjs-empty-project.git

--------------------------------------------------------------------------------------------------------------------------