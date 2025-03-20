import Location from "../models/locationModel.js";


// Add a new location
const addLocation = async (req, res) => {
    try {
        const { state, city, area, locationName } = req.body;
        const newLocation = new Location({ state, city, area, locationName });
        await newLocation.save();
        res.status(201).json({ message: 'Location added successfully', location: newLocation });
    } catch (error) {
        res.status(500).json({ message: 'Error adding location', error });
    }
};

// Fetch all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

// Retrieve a specific location by ID
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching location', error });
    }
};

// Update location details
const updateLocation = async (req, res) => {
    try {
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
        res.status(200).json({ message: 'Location updated successfully', location: updatedLocation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

// Remove a location
const deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting location', error });
    }
};

export {
    addLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
};
