import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <iframe
        width="600"
        height="450"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=[API KEY]
          &q=Space+Needle,Seattle+WA">
      </iframe>
    </div>
  );
}

export default App;
