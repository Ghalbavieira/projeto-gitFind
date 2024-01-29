import {Header} from '../../components/Header';
import background from '../../Assets/background.png';
// import {Input} from '../../components/Input';
import {ItemList} from '../../components/ItemList';
import { useState} from 'react';

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);


const handleGetData = async () => {
  const userData = await fetch(`https://api.github.com/users/${user}`);
  const newUser = await userData.json();

  if(newUser.name){
    const {avatar_url, name, bio, login} = newUser;
    setCurrentUser({avatar_url, name, bio , login});

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();

    if(newRepos.length){
      setRepos(newRepos);
    }
  }
}



  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} alt='Git Avatar'  className='git-avatar'/>

        <div className="info">
            <input name='user' type='text' 
            value={user} 
            onChange={event => setUser(event.target.value)} 
            placeholder='@username' />
            <button type='button'
            onClick={handleGetData}>
              Pesquisar
            </button>
            {currentUser?.name ? ( <>


            <div className="perfil">
              <img alt="" src={currentUser.avatar_url} className="profile"/>
              <div className="profile-text">
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr/>
            </>) : null}
            {repos?.length ? (
            <div>
              <h4>Repositórios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
