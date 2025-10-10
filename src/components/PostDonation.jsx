import React, { useState } from 'react';
import { Camera, MapPin, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import donationService from '../services/donationService.js';

const PostDonation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemType: '',
    foodType: '',
    donationCategory: 'food',
    quantity: '',
    amount: '',
    unit: 'Meals',
    description: '',
    pickupAddress: '',
    availableFrom: '',
    availableTo: '',
    expiryDate: '',
    expiryTime: '',
    specialInstructions: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images`);
      return;
    }
    
    const validFiles = [];
    const previewUrls = [];
    
    files.forEach(file => {
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large. Maximum size is 5MB`);
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not an image`);
        return;
      }
      
      validFiles.push(file);
      previewUrls.push(URL.createObjectURL(file));
    });
    
    setSelectedImages(validFiles);
    setImagePreviewUrls(previewUrls);
    setError(''); // Clear any previous errors
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.itemType || !formData.quantity || !formData.description || 
          !formData.pickupAddress || !formData.availableFrom || !formData.availableTo ||
          !formData.expiryDate || !formData.expiryTime) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create donation object
      const donationData = {
        title: formData.itemType,
        foodType: formData.foodType,
        donationCategory: formData.donationCategory,
        description: formData.description,
        quantity: `${formData.quantity} ${formData.unit}`,
        amount: formData.amount || '',
        category: formData.donationCategory,
        location: formData.pickupAddress,
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
        expiryDate: formData.expiryDate,
        expiryTime: formData.expiryTime,
        expires: `${formData.expiryDate}, ${formData.expiryTime}`,
        specialInstructions: formData.specialInstructions,
        pickup: `${formData.availableFrom} - ${formData.availableTo}`,
        image: imagePreviewUrls.length > 0 ? imagePreviewUrls[0] : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        images: imagePreviewUrls,
        imageFiles: selectedImages,
        status: 'available'
      };

      // Save to Firebase
      const result = await donationService.createDonation(donationData);

      if (result.success) {
        // Show success message
        setError('');
        
        // Reset form
        setFormData({
          itemType: '',
          foodType: '',
          donationCategory: 'food',
          quantity: '',
          amount: '',
          unit: 'Meals',
          description: '',
          pickupAddress: '',
          availableFrom: '',
          availableTo: '',
          expiryDate: '',
          expiryTime: '',
          specialInstructions: ''
        });
        setSelectedImages([]);
        setImagePreviewUrls([]);
        
        // Show success message and navigate
        alert('Donation posted successfully! It will now appear in your donations and be visible to activists.');
        // Navigate to donations page
        navigate('/dashboard/donations');
      } else {
        setError(result.error || 'Failed to post donation');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Post donation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setLoading(true);
    setError('');

    try {
      // Create draft donation object
      const draftData = {
        title: formData.itemType || 'Draft Donation',
        foodType: formData.foodType || 'Mixed',
        donationCategory: formData.donationCategory,
        description: formData.description || 'Draft description',
        quantity: formData.quantity ? `${formData.quantity} ${formData.unit}` : 'TBD',
        amount: formData.amount || '',
        category: formData.donationCategory,
        location: formData.pickupAddress || 'TBD',
        availableFrom: formData.availableFrom || 'TBD',
        availableTo: formData.availableTo || 'TBD',
        expiryDate: formData.expiryDate || 'TBD',
        expiryTime: formData.expiryTime || 'TBD',
        expires: formData.expiryDate && formData.expiryTime ? `${formData.expiryDate}, ${formData.expiryTime}` : 'TBD',
        specialInstructions: formData.specialInstructions || '',
        pickup: formData.availableFrom && formData.availableTo ? `${formData.availableFrom} - ${formData.availableTo}` : 'TBD',
        image: imagePreviewUrls.length > 0 ? imagePreviewUrls[0] : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        images: imagePreviewUrls,
        imageFiles: selectedImages,
        status: 'draft',
        isDraft: true
      };

      // Save draft to Firebase
      const result = await donationService.createDonation(draftData);

      if (result.success) {
        alert('Donation saved as draft successfully!');
        // Navigate to donations page to see the draft
        navigate('/dashboard/donations');
      } else {
        setError(result.error || 'Failed to save draft');
      }
    } catch (err) {
      setError('An unexpected error occurred while saving draft');
      console.error('Save draft error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post New Donation</h1>
        <p className="text-gray-600">Share your surplus food with the community and help reduce waste.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Category *
            </label>
            <select
              name="donationCategory"
              value={formData.donationCategory}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="food">Food Items</option>
              <option value="clothing">Clothing & Textiles</option>
              <option value="stationery">Educational Supplies</option>
              <option value="other">Other Essentials</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.donationCategory === 'food' ? 'Food Type' : 'Item Type'} *
              </label>
              <input
                type="text"
                name="itemType"
                value={formData.itemType}
                onChange={handleInputChange}
                placeholder={
                  formData.donationCategory === 'food' ? 'e.g. Fresh sandwiches & salads' :
                  formData.donationCategory === 'clothing' ? 'e.g. Winter jackets & coats' :
                  formData.donationCategory === 'stationery' ? 'e.g. School supplies bundle' :
                  'e.g. Household items'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {formData.donationCategory === 'food' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Category *
                </label>
                <select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select food category</option>
                  <option value="prepared-meals">Prepared Meals</option>
                  <option value="bakery-items">Bakery Items</option>
                  <option value="fresh-produce">Fresh Produce</option>
                  <option value="packaged-foods">Packaged Foods</option>
                  <option value="dairy-products">Dairy Products</option>
                  <option value="beverages">Beverages</option>
                  <option value="frozen-foods">Frozen Foods</option>
                  <option value="mixed-items">Mixed Items</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Meals">Meals</option>
                  <option value="Items">Items</option>
                  <option value="Kg">Kg</option>
                  <option value="Portions">Portions</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Value (Optional)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="100"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder={
                  formData.donationCategory === 'food' ? 'Provide details about the food, preparation method, ingredients, allergens, etc.' :
                  formData.donationCategory === 'clothing' ? 'Describe the clothing items, sizes, condition, season, etc.' :
                  formData.donationCategory === 'stationery' ? 'List the educational supplies, grade level, subjects, etc.' :
                  'Provide detailed description of the items being donated'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Food Images */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Donation Images</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload donation images</p>
            <p className="text-sm text-gray-500 mb-4">or drag and drop files here (max 5 images, 5MB each)</p>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hidden" 
              id="image-upload"
            />
            <label 
              htmlFor="image-upload"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors inline-block"
            >
              Choose Images
            </label>
          </div>
          
          {/* Image Previews */}
          {imagePreviewUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Images ({imagePreviewUrls.length}/5)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pickup Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Pickup Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  placeholder="Enter pickup address"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available From *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available To *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    name="availableTo"
                    value={formData.availableTo}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    name="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows={3}
              placeholder="Any special handling instructions, allergen information, or additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Posting...' : 'Post Donation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDonation;