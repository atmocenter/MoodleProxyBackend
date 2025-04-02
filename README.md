# 📚 Moodle API Proxy Server

This Node.js-based proxy server allows your frontend application to make API requests to a Moodle instance while bypassing browser CORS restrictions.

## 🚀 Purpose

Moodle’s API often blocks cross-origin requests due to CORS (Cross-Origin Resource Sharing) policies. This proxy server provides a secure and convenient way to forward those requests, enabling frontend applications to interact with the Moodle API.

## 🔧 How It Works

- Requests must be made in the following format:

  ```
  http://yourdomain.com/moodle/[actual-moodle-api-endpoint]
  ```

  For example:

  ```
  http://yourdomain.com/moodle/webservice/rest/server.php?wstoken=abc123&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json
  ```

- The proxy intercepts the request, removes the `/moodle` prefix, and forwards the rest of the URL to your Moodle server.

- The target Moodle server should be defined in the server code (e.g., `http://localhost:8000`).

## 🛡️ Authorization

This proxy requires an `Authorization` header to be present in the request. If the header is missing, the request will be rejected with a `403 Forbidden` response.

Example:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://yourdomain.com/moodle/webservice/rest/server.php?wstoken=...
```

## 📁 Project Structure

```
.
├── index.html          # Optional front page
├── server.js           # Main proxy server file
├── README.md           # Project documentation
```

## 📦 Requirements

- Node.js (v14 or higher recommended)
- npm

## 🛠️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourname/moodle-api-proxy.git
   cd moodle-api-proxy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set your Moodle server target in the code (e.g., inside `server.js`):
   ```js
   const API_SERVICE_URL = 'http://localhost:8000';
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Access it via:
   ```
   http://localhost:3333/moodle/[your-moodle-api-call]
   ```

## 🌐 Example Usage (Browser or Frontend App)

```js
fetch('http://localhost:3333/moodle/webservice/rest/server.php?wstoken=YOUR_TOKEN&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## ⚠️ Security Notice

- **This proxy is intended for development or internal usage.**
- In production environments, make sure to restrict access, validate tokens, and apply HTTPS.

---

## 🧑‍💻 License

MIT License. Feel free to use and modify.
