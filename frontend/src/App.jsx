import RoutesPG from './routes/RoutesPG';
import Sidebar from './components/Sidebar';
function App() {

  return (
    <main>
      <section className="content">
        <Sidebar />
        <section className="each_page">
          <RoutesPG />
        </section>
      </section>
    </main>
  )
}

export default App
