import './App.css';
import Grid from './components/Grid';

const sampleColumns = ["name", "email", "role"];
const sampleData = [
  { name: 'Mikko', email: 'mikko@tai.fi', role: 'admin' },
  { name: 'Ville', email: 'ville@tai.fi', role: 'student' },
  { name: 'Sanna', email: 'sanna@tai.fi', role: 'teacher' },
  { name: 'Aino', email: 'aino@tai.fi', role: 'viewer' },
];

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Reusable Data Grid</h2>
      <Grid columns={sampleColumns} data={sampleData} allowEditing={true} pageSize={20} height="500px" />
    </div>
  );
}

export default App;
