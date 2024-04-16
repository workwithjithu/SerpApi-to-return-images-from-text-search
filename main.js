const express = require('express');
const http = require('http');
const {formidable, errors} = require('formidable');
const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");


const server = http.createServer(async (req, res) => {

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // to allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // methods you want to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // headers you want to allow
      
    // Handle OPTIONS method (pre-flight request)
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString(); // Convert Buffer to string
      });
  
      req.on('end', async () => {
          const parsedBody = JSON.parse(body);
          const inputString = parsedBody.input;
  
          // Now you can use inputString in your code
  
          const response = await getJson({
              q: inputString,
              engine: "google_images",
              ijn: "0",
              api_key: "3d5a2e030bbef1ef25f668168fa41172f4efe431f5ab9d0979d210e0bc0eb74d"    
          });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, 2));
    return

  })  } else {
    // Handle 404 - Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  };
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000/`);
});
