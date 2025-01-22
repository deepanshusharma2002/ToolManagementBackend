const User = require("../Models/User");
const bcrypt = require('bcrypt');


const Login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user does not exist
        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }


        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        // Successful login
        res.send({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const Register = async (req, res) => {
    console.log(req.body);
    const { name, email, password, confirmPassword, number } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send({ error: "Passwords do not match" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            number,
            role: 'User'
        });
        console.log("ADC", newUser);
        await newUser.save();
        res.status(201).send({ message: "Submit Successfully" });
    } catch (error) {
        res.status(400).send(error);
    }
};

const AdminEquipmentsControllers = { Login, Register };
module.exports = AdminEquipmentsControllers;