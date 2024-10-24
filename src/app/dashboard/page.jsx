"use client";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1 }} // Allow content to take available space
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        minHeight: "500px",
        marginTop: 10,
        width: 1000,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", zIndex: 10 }}
      >
        <Tab label="Address" {...a11yProps(0)} className="font-bold" />
        <Tab label="Orders" {...a11yProps(1)} className="font-bold" />
        <Tab label="Change Password" {...a11yProps(2)} className="font-bold" />
        <Tab label="Logout" {...a11yProps(3)} className="font-bold" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <div className="mx-auto bg-white p-8 shadow-md rounded-lg relative left-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Shipping Address</h2>
          <form className="w-[600px] mx-auto">
            <div className="flex space-x-11">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-11">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="state"
                >
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-11">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-[400px] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Shipping
            </button>
          </form>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div class="container mx-auto p-8 w-[600px]">
          <h2 class="text-2xl font-semibold mb-6">Order Summary</h2>
          <div class="">
            <table class="w-[300px] bg-white border border-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Serial No.
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Shipping Price
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    1
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    PID12345
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    Product A
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    $100.00
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    $10.00
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm">
                    <span class="inline-block px-2 py-1 font-semibold leading-tight text-green-800 bg-green-100 rounded-full">
                      Shipped
                    </span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200 text-sm">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div class="container mx-auto p-8">
          <h2 class="text-2xl font-semibold mb-6 text-center">Change Password</h2>
          <form class="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg">
           <div className="flex space-x-5">
           <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
           </div>

           <div className="flex space-x-5">
           <div class="mb-4">
              <label
                class="block text-gray-700 font-medium mb-2"
                for="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 font-medium mb-2"
                for="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
           </div>

            <div class="mt-6">
              <button
                type="submit"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      LOGOUT!
      </TabPanel>
    </Box>
  );
}
