import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_API_KEY';

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') getWeather();
  };

  const cities = [
    { city: 'Delhi', temp: 35, icon: 'sunny.png' },
    { city: 'Mumbai', temp: 30, icon: 'rain.png' },
    { city: 'Kolkata', temp: 28, icon: 'cloudy.png' },
    { city: 'Bengaluru', temp: 25, icon: 'thunder.png' },
    { city: 'Chennai', temp: 34, icon: 'sunny.png' }
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/assets/bg_img.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen px-4 py-10 flex flex-col items-center bg-black/50 backdrop-blur-sm"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-[Pacifico] text-white text-center mb-12 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
        >
          Weather_disclosed
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-lg mb-10"
        >
          <div className="flex shadow-lg">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow p-3 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <button
              onClick={getWeather}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 px-6 text-white font-semibold rounded-r-lg transition-all duration-200"
            >
              Search
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl mb-14">
          {cities.map((c, i) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              key={i}
              className="bg-white/80 backdrop-blur-md text-black p-5 rounded-xl text-center shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-1">{c.city}</h2>
              <img
                src={`/assets/${c.icon}`}
                alt={c.city}
                className="w-14 h-14 mx-auto my-3"
              />
              <p className="text-2xl font-bold">{c.temp}°C</p>
            </motion.div>
          ))}
        </div>

        {loading && <p className="text-lg text-blue-100 font-medium">Fetching weather...</p>}
        {error && <p className="text-lg text-red-400 font-medium">{error}</p>}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md text-black p-6 rounded-xl shadow-lg w-full max-w-md text-center space-y-2"
          >
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-4xl font-extrabold">{weather.main.temp}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} km/h</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
