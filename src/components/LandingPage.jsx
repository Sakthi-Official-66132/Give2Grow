import React from 'react';
import { ArrowRight, Heart, Users, Package, Shirt, BookOpen, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const stats = [
    { number: '2,500+', label: 'Meals Rescued', icon: Package },
    { number: '150+', label: 'Partner Organizations', icon: Users },
    { number: '80+', label: 'Active Volunteers', icon: Heart },
    { number: '1,200kg', label: 'Waste Reduced', icon: Gift }
  ];

  const categories = [
    {
      icon: Package,
      title: 'Food Donations',
      description: 'Fresh meals, groceries, and surplus food from restaurants and stores',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Shirt,
      title: 'Clothing & Textiles',
      description: 'Clothes, shoes, blankets, and other textile items for those in need',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Educational Supplies',
      description: 'Books, stationery, school supplies, and learning materials',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Gift,
      title: 'Other Essentials',
      description: 'Household items, personal care products, and other necessities',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const userTypes = [
    {
      icon: Package,
      title: 'For Donors',
      description: 'Easily post surplus food, clothing, and other items. Track your positive impact on the community.',
      features: ['Quick donation posting', 'Impact tracking', 'Pickup coordination']
    },
    {
      icon: Heart,
      title: 'For Volunteers',
      description: 'Browse available donations, coordinate pickups, and help distribute items to those who need them most.',
      features: ['Real-time notifications', 'Route optimization', 'Community impact']
    },
    {
      icon: Users,
      title: 'For Organizations',
      description: 'Comprehensive oversight and analytics to ensure efficient distribution and maximum community impact.',
      features: ['Analytics dashboard', 'User management', 'Impact reporting']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-gray-800">Give2Grow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Bridge the Gap Between{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Waste and Needed People
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect donors with community volunteers to reduce waste and feed those in need. 
            Together, we can create a sustainable ecosystem of giving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              Start Helping Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 px-8 py-4 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Give2Grow Works</h2>
            <p className="text-xl text-gray-600">
              Our platform connects three key stakeholders in the fight against waste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <type.icon className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Can You Donate?</h2>
            <p className="text-xl text-gray-600">
              We accept a wide variety of items to help those in need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Making a Real Impact</h2>
            <p className="text-xl text-green-100">
              Together, we're building a more sustainable future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-12 rounded-2xl">
            <Heart className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community and be part of the solution. Whether you're a donor, volunteer, 
              or community activist, your contribution matters.
            </p>
            <Link
              to="/get-started"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 inline-flex items-center"
            >
              Join Give2Grow Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-8 w-8 text-green-500 mr-3" />
            <span className="text-2xl font-bold">Give2Grow</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Give2Grow. Building bridges, reducing waste, feeding communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;