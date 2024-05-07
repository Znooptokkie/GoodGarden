// function batteryVoltageimage322() {
//     axios.get('http://127.0.0.1:5000/') // Send a GET request to the server
//         .then(response => {
//             const data = response.data; // Extract the data from the response

//             // Find the device with device_id 322
//             const device322 = data.find(device => device.device_id === 322);
            
//             if (device322) {
//                 // Extract the battery voltage of device 322
//                 const batteryVoltage = parseFloat(device322.last_battery_voltage); // This is where batteryVoltage is defined
        
//                 // Check if the battery voltage is lower than 3.2 volts
//                 if (batteryVoltage < 3.2) {
//                     // Battery voltage is lower than 3.2 volts, show the warning battery image
//                     document.getElementById('battery-image-322').classList.add('show'); // Add the 'show' class
//                 } else {
//                     // Battery voltage is higher or equal to 3.2 volts, hide the image
//                     document.getElementById('battery-image-322').classList.remove('show'); // Remove the 'show' class
//                 }
                
//                 console.log("Battery Voltage:", batteryVoltage); // Log the battery voltage here
//             } else {
//                 console.error('Device with ID 322 not found in data.'); // Log an error if device 322 is not found
//             }
//         })
//         .catch(error => console.error('Error fetching battery data:', error)); // Log any errors that occur during the request
// }

// // Call the function to fetch battery data when the page loads
// window.addEventListener('load', batteryVoltageimage322);



// function batteryVoltageimage256() {
//     axios.get('http://127.0.0.1:5000/') // Send a GET request to the server
//         .then(response => {
//             const data = response.data; // Extract the data from the response

//             // Find the device with device_id 256
//             const device256 = data.find(device => device.device_id === 256);
            
//             if (device256) {
//                 // Extract the battery voltage of device 256
//                 const batteryVoltage = parseFloat(device256.last_battery_voltage); // This is where batteryVoltage is defined
        
//                 // Check if the battery voltage is lower than 3.2 volts
//                 if (batteryVoltage < 3.2) {
//                     // Battery voltage is lower than 3.2 volts, show the warning battery image
//                     document.getElementById('battery-image-256').classList.add('show'); // Add the 'show' class
//                 } else {
//                     // Battery voltage is higher or equal to 3.2 volts, hide the image
//                     document.getElementById('battery-image-256').classList.remove('show'); // Remove the 'show' class
//                 }
                
//                 console.log("Battery Voltage:", batteryVoltage); // Log the battery voltage here
//             } else {
//                 console.error('Device with ID 256 not found in data.'); // Log an error if device 256 is not found
//             }
//         })
//         .catch(error => console.error('Error fetching battery data:', error)); // Log any errors that occur during the request
// }

// // Call the function to fetch battery data when the page loads
// window.addEventListener('load', batteryVoltageimage256);