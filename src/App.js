import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


const App = () => {

	const [monsters, setMonsters] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	console.log('rendered');

	useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users))
  },[]);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchTerm);
    });
		setFilteredMonsters(newFilteredMonsters);
	},[monsters, searchTerm])

	const onSearchChange = (event) => {
		const searchTermString = event.target.value.toLowerCase();
		setSearchTerm(searchTermString);
	}

	

	return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}


// class App extends Component {

// 	constructor(){
// 		super();
// 		this.state = {
//       monsters: [],
// 			searchTerm: '',
//     };

// 	}

// 	componentDidMount(){
// 		fetch('https://jsonplaceholder.typicode.com/users')
// 			.then((response) => response.json())
// 			.then((users) => this.setState(() => {
// 				return { monsters: users, filteredMonsters: users };
// 			}))
// 	}

// 	onSearchChange = (event) => {
// 		const searchTerm = event.target.value.toLowerCase();
// 		this.setState(() => {
// 			return { searchTerm }
// 		})
// 	}

// 	render(){
// 		const { monsters, searchTerm} = this.state;
// 		const { onSearchChange } = this;

// 		const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchTerm);
//     });

// 		return (
//       <div className="App">
// 				<h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox
// 					className="monsters-search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
// 	}
  
// }

export default App;
