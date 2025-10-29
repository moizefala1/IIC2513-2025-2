import { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // NO MODIFICAR ESTE USE EFFECT:
  // esto verifica si ya existe un token válido al montar la página, redirigiendo directamente 
  // a vista user
  useEffect(() => {
    const token = Cookies.get('token')
    
    if (token) {
      try {
        const decoded = jwtDecode(token) as { exp?: number }
        
        // Verificar si el token aún no ha expirado
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          console.log('Token válido encontrado, redirigiendo a /user')
          navigate('/user')
        } else {
          // Token expirado, eliminarlo
          console.log('Token expirado, eliminando cookie')
          Cookies.remove('token')
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error)
        Cookies.remove('token')
      }
    }
  }, [navigate])


  // MODIFICAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: email,
        password: password,
        expiresInMins: 30
      })

      const { accessToken } = response.data

      const decoded = jwtDecode(accessToken)

      if (rememberMe) {
        const expirationDate = new Date(decoded.exp * 1000) // exp esta en segundos, date necesita milisegundos
        Cookies.set('token', accessToken, { expires: expirationDate })
      } else {
        Cookies.set('token', accessToken)
      }
      navigate('/user')

    } catch (err: any) {
      console.error('Error en la autenticación:', err)
      
      if (err.response) {
        setError(err.response.data.message || 'Credenciales inválidas. Por favor, intenta nuevamente.')
      } else if (err.request) {
        setError('Error de conexión. Por favor, verifica tu conexión a internet.')
      } else {
        setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 animate-slide-in-left">
        <h2 className="text-center text-4xl font-extrabold text-white animate-appear delay-200">
          Bienvenido
        </h2>
        <p className="text-center text-gray-200 animate-appear delay-500">
          Inicia sesión en tu cuenta
        </p>
        {error && (
          <div className="text-red-300 text-sm text-center bg-red-900/30 border border-red-500 rounded-lg p-3">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              id="email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="emilys"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:top-2 peer-focus:-top-3.5 
              peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Usuario
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Contraseña"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:top-2 peer-focus:-top-3.5 
              peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Contraseña
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2">Recordarme</span>
            </label>
            <a 
              href="https://dummyjson.com/docs/auth" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-purple-200 hover:underline"
            >
              Ver documentación
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md shadow-lg text-white font-semibold transition duration-200 ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="text-center text-gray-300">
          ¿Necesitas credenciales de prueba?{' '}
          <a 
            href="https://dummyjson.com/users" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-300 hover:underline"
          >
            Ver usuarios disponibles
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
