## Uloge

- Team Leader - Upravlja sa zadacima i resava probleme na koje tim nailazi prilikom razvoja
- Project Manager - Upravlja projektom i ima direktan kontakt sa klijentima
- Back-end Developer - Kreira API i dokumentaciju
- Front-end Developer - Kreira stranice i povezuje API
- UI/UX/QA Tester & Tehnical Support - Testiranje i podrska

---

## Scrum

- Sprint - Vremenski period od ponedeljka do petaka
- Dnevni Scrum - Svakodnevni kratki izvestaj o radu
- Retrospektiva - Pregled sprinta i dogovaranje za sledeci sprint

---

## Server

- Local - Server za razvoj u lokalhostu
- Staging - Online server za razvoj
- Production - Online server na kome se uploaduje pravi sajt

---

## Trello

- Bug - Lista sa pronadjenim greskama prilikom testiranja
- To Do - Lista sa zadacima za trenutni sprint
- Doing - Zadaci na kojima se trenutno radi
- Done - Zavrseni zadaci koji su jos uvek u lokalu
- Staging - Zavrseni zadaci koji se nalaze na staging serveru
- Released - Zavrseni i publishovani zadaci na production server
- Archived - Zavrseni i publishovani zadaci koji su prosli testiranje

---

## Git-Flow

- develop - Grana za razvoj
- feature - Novi feature se kreira iz develop grane i zluzi za razvijanje stvari koje oduzimaju vise vremena
- master - Grana sa stabilnim verzijama
- hotfix - Hotfix se kreira iz master grane i sluzi za popravku bagova koji ce se primeniti i na master i na develop granu

---

## Commit poruke

- -Fix xxx in xxxx page
- -Update xxxx in xxxx module
- -Create xxx function in xxxx page

---

## Verzija

- npm run version:major => X.0.0 -> Novi projekat
- npm run version:minor => 1.X.0 -> Build to prod (Spajanje iz develop u master)
- npm run version:patch => 1.0.X -> hotfix

---

## Imenovanje

- Function names		- Camel Case (initFunction)
- Variable names		- Camel Case (variableName)
- CSS class name		- Hyphen Delimited Strings - BEM — Block Element Modifier (button-success-green)
- ID of an element		- Underscore delimiter (element_id)
- Folder				- Camel Case (layout, pageName)
- File					- Pascal Case (ComponentName)

---

## Struktura projekta

```
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
```

---

## Kreiranje projekta

Instaliraj NODE | NPM | GIT  
```
node --version
npm --version
git --version
```

<br />
<br />

Instaliraj modul za kreiranje react applikacije:  
npm install -g create-react-app

Kreiranje react applikacije  
U direktorijumu gde zelimo da kreiramo projekat kreirace se folder 'my-app'  
https://create-react-app.dev/docs/getting-started/  
```
create-react-app my-app --use-npm
```

<br />

Pokretanje react servera  
Pristupimo folderu 'my-app' i startujemo server  
```
cd my-app
npm start
```

<br />

Pokretanje projekta u VS Code  
Pristupiti projetku u CMD  
```
code .
```

<br />
<br />

Instaliraj u folderu od projekta modul za rutiranje stranica  
https://www.npmjs.com/package/react-router-dom  
```
npm install --save react-router-dom
```

<br />

Instaliraj u folderu od projekta SCSS modul  
src/App.css to src/App.scss | update in src/App.js file -> import src/App.scss  
https://create-react-app.dev/docs/adding-a-sass-stylesheet/  
```
npm install node-sass --save
```

<br />

Instaliraj u folderu od projekta Material Icons modul  
```
@import "~material-design-icons/iconfont/material-icons.css"; (Dodaj u main.scss)
<i className='material-icons'>close</i>

npm install material-design-icons
```

<br />

Instaliraj u folderu od projekta Font Awesome Icons modul
Moze se linkovati CDN verzija u main.scss i da se ne instalira modul
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css');
https://www.npmjs.com/package/react-fontawesome
```
npm install --save react-fontawesome
```

<br />

Instaliraj u folderu od projekta Bootstrap modul
https://react-bootstrap.github.io/getting-started/introduction/
```
npm install react-bootstrap bootstrap
```

<br />

Instaliraj u folderu od projekta storybook modul za testiranje komponenti
https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/
```
cd my-app
npx -p @storybook/cli sb init
npm run storybook
```

---

## Prazan projekat

```
https://github.com/milansourcecoding/reactjs-empty-project.git
https://github.com/milansourcecoding/laravel-empty-project.git
```

---

## CLASS

```
import React, { Component } from 'react';

class EmptyPage extends Component {
    constructor(props) {
        super(props);
        
		let title = props.title ? props.title : '';
	  
		this.state = {
			title: title,
		}
    }


	componentDidMount() {
        
    }
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.title !== this.state.title) {
			let title = nextProps.title ? nextProps.title : '';
			this.setState({
				title: title
			});
		}
	}
    

    render() {
        return <div>{this.state.title}</div>
    }
}

export default EmptyPage;
```

---

## HOOK

```
import React from 'react';

const EmptyPage = React.forwardRef((props, ref) => {
    const [title, setTitle] = React.useState(props.title ? props.title : '');
	
    React.useEffect(() => {
        setTitle(props.title ? props.title : '');
    }, [title]);

    return (
        <div>{title}</div>
    );
});

export default EmptyPage;
```