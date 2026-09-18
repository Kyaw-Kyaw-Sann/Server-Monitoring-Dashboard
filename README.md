# Server Monitoring Dashboard (Demo)

A responsive React dashboard that visualizes demonstration server-health data: CPU, memory, disk use, active connections, service status, and a server location map.

> This repository is a frontend demonstration. It reads only the bundled sample file at `public/data.json`; it does not connect to a real server.

## Features

- CPU and memory history charts
- Current service-status and location panels
- Timestamped monitoring history
- Responsive layout built with Tailwind CSS
- GitHub Pages deployment workflow

## Run locally

Prerequisite: Node.js 22 (or a current Node.js LTS release).

```bash
npm ci
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173`.

## Quality checks and production build

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` creates the deployable files in `dist/`.

## Deploy on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to `main` (or run **Deploy demo to GitHub Pages** from the Actions tab).
5. When the workflow finishes, GitHub displays the public website URL.

The app uses relative Vite asset paths and hash routing, so it works at a repository subpath and the Task Manager page can be refreshed safely.

## Demo data and security

Edit `public/data.json` to change the displayed sample measurements. Do not commit real server addresses, credentials, API keys, or sensitive locations to a public repository. For a future public API URL, use a local `.env` file following `.env.example`.

## License

[MIT](LICENSE)
