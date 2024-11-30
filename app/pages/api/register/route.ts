// pages/api/register.js
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Define a Zod schema for the registration data
const userSchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters.")
});

// Function to validate data using Zod
const validateUserData = (data) => {
  try {
    userSchema.parse(data); // This will throw an error if the validation fails
    return null;
  } catch (err) {
    return err.errors.map((error) => error.message).join(', ');
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, password, password_confirmation } = req.body;

    // Validate the data using Zod
    const validationError = validateUserData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check if passwords match
    if (password !== password_confirmation) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // Get the current data in the users.json file
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    let users = [];

    // Check if the file exists and read its contents
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      users = JSON.parse(fileData);
    }

    // Create the new user object
    const newUser = {
      id: users.length + 1, // simple ID generation, can be improved
      first_name,
      last_name,
      email,
      password, // In production, hash the password here
    };

    // Append the new user to the existing users array
    users.push(newUser);

    // Write the updated users array back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    // Send a success response
    return res.status(201).json({ message: 'Account created successfully!' });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
