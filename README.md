# Give2Grow - Donation Management Platform

Give2Grow is a comprehensive donation management platform that connects donors (restaurants, individuals, organizations) with community activists and volunteers to reduce waste and help those in need. The platform supports various types of donations including food, clothing, stationery, and other essential items.

## 🌟 Features

### For Donors
- **Easy Donation Posting**: Quick and intuitive interface to post surplus items
- **Multiple Categories**: Support for food, clothing, stationery, and other items
- **Real-time Tracking**: Monitor views, claims, and completion status
- **Impact Analytics**: See the positive impact of your donations
- **Pickup Coordination**: Seamless communication with volunteers

### For Activists/Volunteers
- **Browse Donations**: Search and filter available donations by category, location, and urgency
- **Claim Management**: Request and manage donation pickups
- **Route Optimization**: Efficient pickup and delivery coordination
- **Impact Tracking**: Track beneficiaries helped and community impact

### For Administrators
- **User Management**: Comprehensive user administration and role management
- **System Analytics**: Detailed insights into platform usage and impact
- **Content Moderation**: Tools to ensure quality and safety
- **Reporting**: Generate impact reports and analytics

### General Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Notifications**: Stay updated on donation status and requests
- **Secure Authentication**: Safe and secure user authentication
- **Multi-role Support**: Different interfaces for donors, activists, and admins
- **Location-based Matching**: Connect nearby donors and volunteers
- **Impact Measurement**: Track meals served, people helped, and waste reduced

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/give2grow.git
   cd give2grow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── dashboards/
│   │   ├── ActivistDashboard.js
│   │   ├── AdminDashboard.js
│   │   └── DonorDashboard.js
│   ├── AllDonations.js
│   ├── Analytics.js
│   ├── AuthPage.js
│   ├── Beneficiaries.js
│   ├── BrowseFood.js
│   ├── Dashboard.js
│   ├── ImpactReports.js
│   ├── LandingPage.js
│   ├── Layout.js
│   ├── MyRequests.js
│   ├── PostDonation.js
│   ├── ProfileSettings.js
│   ├── SystemAnalytics.js
│   ├── SystemSettings.js
│   ├── UserManagement.js
│   └── ViewListings.js
├── config/
│   └── firebase.js
├── context/
│   └── AuthContext.js
├── services/
│   ├── authService.js
│   ├── donationService.js
│   └── requestService.js
├── types/
│   └── index.js
├── App.js
├── index.css
└── main.js
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color Palette**: Green primary (#10B981), Blue secondary (#3B82F6)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable UI components with hover states and animations
- **Responsive**: Mobile-first design with proper breakpoints

## 🔐 Authentication & Authorization

The platform supports multiple user types:
- **Donors**: Restaurants, stores, individuals with surplus items
- **Activists**: Community volunteers who collect and distribute donations
- **Admins**: Platform administrators with full system access

## 📱 User Roles & Permissions

### Donor Permissions
- Post and manage donations
- View donation analytics
- Communicate with activists
- Track donation impact

### Activist Permissions
- Browse and claim donations
- Manage pickup requests
- Track delivery impact
- View community statistics

### Admin Permissions
- Full user management
- System configuration
- Analytics and reporting
- Content moderation

## 🌍 Environmental Impact

FoodBridge helps reduce waste and environmental impact by:
- Preventing food waste from going to landfills
- Reducing textile waste through clothing donations
- Minimizing resource waste through item reuse
- Tracking CO₂ savings and environmental metrics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@foodbridge.com or join our community Discord server.

## 🙏 Acknowledgments

- Thanks to all contributors who help make FoodBridge better
- Inspired by the global movement to reduce waste and help communities
- Built with modern web technologies and best practices

## 📊 Statistics

- **2,500+** meals rescued from waste
- **150+** partner organizations
- **80+** active volunteers
- **1,200kg** waste reduced

---

**Give2Grow** - Building bridges, reducing waste, feeding communities. 🌱