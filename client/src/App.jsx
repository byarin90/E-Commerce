import './App.css'
import myStore from './shared/redux/store'
import AppRoutes from './shared/routes/appRoutes'
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  )
}

export default App
