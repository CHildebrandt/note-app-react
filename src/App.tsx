import './App.scss';
import './global.css';
import TopBarContainer from './components/TopBar/TopBarContainer';
import LeftBarContainer from './components/LeftBar/LeftBar';
import MainSection from './components/MainSection/MainSection';

function App() {
    return (
        <div className="App">
            <TopBarContainer />
            <LeftBarContainer />
            <MainSection />
        </div>
    )
}

export default App;
