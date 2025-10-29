import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [minutes, setMinutes] = useState(1)

  useEffect(() => {
    setError('')
    setTimeLeft('')

    // Si no hay token, no iniciamos ningún temporizador
    if (!token) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    try {
      const calculateTimeLeft = () => {
        const decoded = jwtDecode<{ exp?: number }>(token)
        const expirationTime = decoded?.exp
        const now = Math.floor(Date.now() / 1000) 
        const diff = expirationTime - now
        if (diff <= 0) {
          setTimeLeft('Expirado')
          return true
        }
        const hours = Math.floor(diff / 3600)
        const minutes = Math.floor((diff % 3600) / 60)
        const seconds = diff % 60
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` 
        //padstart fue una solucion propuesta por el modelo GPT-5
        setTimeLeft(formattedTime)
        return false
      }

      intervalId = setInterval(() => {
        const isExpired = calculateTimeLeft()
        if (isExpired && intervalId) {
          clearInterval(intervalId)
        }
      }, 1000)

    } catch (error) {
      console.error('Error al decodificar el token:', error)
    }

 
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [token])

  useEffect(() => {
    const storedToken = Cookies.get('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUserData(storedToken)
    }
  }, [])

  const fetchUserData = async (accessToken: string) => {

    setLoading(true)
    setError('')
    
    try {
      const response = await axios.get('https://dummyjson.com/auth/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      setUser(response.data)
      console.log('Datos del usuario obtenidos:', response.data)

    } catch (err: any) {
      console.error('Error al obtener datos del usuario:', err)
      
      if (err.response) {
        console.error('Respuesta de error:', err.response.data)
        setError(err.response.data.message || 'Error al cargar los datos del usuario')
      } else if (err.request) {
        setError('Error de conexión. Por favor, verifica tu conexión a internet.')
      } else {
        setError('Ocurrió un error inesperado.')
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshToken = async () => {
    setError('')
    setRefreshLoading(true)
    const decoded = jwtDecode(token)
    if (decoded.exp *1000 < Date.now()) {
      setError('El token ya ha expirado, no puedes refrescarlo.')
      setRefreshLoading(false)
      return
    }


    try {
      const response = await axios.post('https://dummyjson.com/auth/refresh', {
        expiresInMins: minutes,
        refreshToken: token
      })

      const { accessToken } = response.data

      const decoded = jwtDecode(accessToken)
      if (decoded.exp) {
        const expirationDate = new Date(decoded.exp * 1000)
        Cookies.set('token', accessToken, { expires: expirationDate })

      }
      fetchUserData(accessToken)
      setToken(accessToken)
      setRefreshLoading(false)

    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || 'Error al refrescar el token')
      } else if (err.request) {
        setError('Error de conexión. Por favor, verifica tu conexión a internet.')
      } else {
        setError('Ocurrió un error inesperado al refrescar el token.')
      }
    } finally {
      setRefreshLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    setUser(null)
    setToken('')
    setRefreshLoading(false)
    setTimeLeft('')
    setError('')
    window.location.href = '/'
  }



  if (token === '') return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl p-8 space-y-6 text-white animate-slide-in-left">
        <h2 className="text-3xl font-bold text-center">No estás autenticado</h2>
        <p className="text-center text-gray-200">Por favor, inicia sesión para ver tu perfil.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
        >
          Ir al Login
        </button>
      </div>
    </div>
  )


  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Panel de Usuario</h1>
            <button
              onClick={logout}
              className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-300 text-sm bg-red-900/30 border border-red-500 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Information */}
          <div className="bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                <p className="mt-4">Cargando información...</p>
              </div>
            ) : user ? (
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-semibold">ID:</span>
                  <span>{user.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-semibold">Usuario:</span>
                  <span>{user.username}</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-semibold">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-semibold">Nombre:</span>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-semibold">Género:</span>
                  <span>{user.gender}</span>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-200">No se pudo cargar la información del usuario</p>
            )}
          </div>

          {/* Token Information */}
          <div className="bg-gradient-to-r from-green-700 to-blue-600 rounded-xl shadow-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Información del Token</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold mb-2">Token JWT:</p>
                <div className="bg-black/20 rounded p-2 break-all text-sm font-mono">
                  {token}
                </div>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-2">
                <span className="font-semibold">Expira en:</span>
                <span className={`font-mono ${timeLeft === 'Expirado' ? 'text-red-300' : 'text-green-300'}`}>
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Refresh */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl shadow-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Gestión de Token</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="refreshMinutes" className="block mb-2 text-sm font-semibold">
                Extender sesión por (minutos):
              </label>
              <select
                id="refreshMinutes"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                className="w-full py-2 px-4 text-gray-900 rounded-md"
                disabled={refreshLoading}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} minuto{i + 1 > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={refreshToken}
              disabled={refreshLoading}
              className={`py-2 px-6 rounded-md shadow-lg text-white font-semibold transition duration-200 ${
                refreshLoading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-700'
              }`}
            >
              {refreshLoading ? 'Refrescando...' : 'Refrescar Token'}
            </button>
          </div>
        </div>

        {/* API Documentation Link */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl shadow-2xl p-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-gray-300 mb-4">Consulta la documentación de la API para más información</p>
          <a 
            href="https://dummyjson.com/docs/auth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block py-2 px-6 bg-blue-500 hover:bg-blue-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
          >
            Ver Documentación
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
