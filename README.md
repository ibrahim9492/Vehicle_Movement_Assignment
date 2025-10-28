# Vehicle Tracking Map Application

A real-time vehicle tracking application built with React and Leaflet that visualizes vehicle movement on an interactive map with configurable settings and detailed vehicle information.

## Features

### 1. Interactive Map Display
- Real-time vehicle tracking with smooth animations
- Street-level map view using OpenStreetMap
- Vehicle marker with directional rotation based on movement
- Route visualization with polyline tracking

### 2. Vehicle Information Modal
When hovering over the vehicle marker, a detailed information card displays:
- Current speed (km/h)
- Total distance traveled
- Battery life percentage
- Connection status (WIRELESS/WIRED)
- Current timestamp
- Vehicle status (Running/Stopped)

### 3. Configuration Panel
A stylish configuration card located at the bottom-left of the map allows users to:
- Select connection type (WIRELESS/WIRED)
- Choose time period (Today/Yesterday/Last Week)
- Apply settings with a prominent SHOW button
- Minimize/maximize the configuration panel

### 4. Playback Controls
- Play/Pause button to control vehicle movement
- Reset button to restart the route
- Speed control with options (0.5x, 1x, 2x, 4x)
- Real-time speed and position information

## Technical Implementation

### Map Features
- Built using React-Leaflet for map integration
- Custom car icon with directional rotation
- Smooth animations for vehicle movement
- Route visualization using polylines

### Vehicle Tracking
- Real-time position updates
- Directional changes based on route
- Speed calculations using Haversine formula
- Timestamp-based movement simulation

### User Interface
- Modern glass-morphism design
- Responsive layout
- Smooth animations and transitions
- Mobile-friendly interface

## Route Data Structure

The application uses a JSON format for route data:
```json
{
  "latitude": number,
  "longitude": number,
  "timestamp": string,
  "speed": number,
  "direction": string
}
```

Direction values: "N", "S", "E", "W", "NE", "NW", "SE", "SW"

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd vehicle-map
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dependencies

- React
- React-Leaflet
- Leaflet
- Other dependencies listed in package.json

## Project Structure

```
vehicle-map/
├── public/
│   └── dummy-route.json    # Sample route data
├── src/
│   ├── components/
│   │   ├── MapView.js      # Main map component
│   │   ├── VehicleTooltip.js  # Vehicle info tooltip
│   │   └── ConfigureCard.js   # Configuration panel
│   ├── styles/
│   │   ├── MapView.css
│   │   ├── VehicleTooltip.css
│   │   └── ConfigureCard.css
│   ├── App.js
│   └── index.js
└── README.md
```

## Customization

### Route Data
You can customize the vehicle route by modifying the `dummy-route.json` file in the public directory. Ensure each point includes:
- Latitude and longitude coordinates
- Timestamp
- Speed
- Direction

### Styling
The application uses separate CSS modules for each component, making it easy to customize:
- `MapView.css` - Map container and controls styling
- `VehicleTooltip.css` - Vehicle information popup styling
- `ConfigureCard.css` - Configuration panel styling

## Browser Support

The application is tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it. 


# Deployment URL

```
https://vehicle-map-simulator-nine.vercel.app/
```

