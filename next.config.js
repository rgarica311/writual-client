/** @type {import('next').NextConfig} */
const path = require('path')
console.log("styles path: ", path.join(__dirname, '/src/app/styles'))
const nextConfig = {
    /* config options here */
    sassOptions: {
        includePaths: [path.join(__dirname, '/src/app/styles')],
    },
  }
   
  module.exports = nextConfig