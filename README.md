# NEU - Store Branding Portal

🌐 **Live Demo**: [https://nue-two.vercel.app/](https://nue-two.vercel.app/)

A comprehensive React-based web application for store branding solutions, featuring both estimation tools and e-commerce functionality.

## 🚀 Features

### 🏪 Store Branding Estimator
- **Smart Calculator**: Calculate optimal fixtures based on store dimensions
- **Real-time Pricing**: Dynamic pricing with city-based multipliers and GST
- **Professional Reports**: Generate detailed Excel estimates
- **Store Types**: Support for grocery, fashion, electronics, pharmacy, and general stores

### 🛒 E-commerce Platform
- **Product Catalog**: Browse branding products with category filtering
- **Custom Sizing**: Configure products with custom dimensions
- **File Upload**: Upload artwork files for each product
- **Shopping Cart**: Full cart management with persistent storage
- **Checkout Flow**: Complete order processing system

### 👤 Authentication System
- **User Registration**: Sign up with email and phone validation
- **Secure Login**: Email/password authentication
- **Protected Routes**: Role-based access control
- **Admin Panel**: Comprehensive order management dashboard

### 📊 Admin Dashboard
- **Order Management**: View, update, and track all orders
- **Status Updates**: Real-time order status management
- **Customer Details**: Complete customer information and order history
- **Artwork Management**: Download and manage customer artwork files
- **Analytics**: Revenue tracking and order statistics

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Vite
- **Styling**: Bootstrap 5
- **Routing**: React Router DOM v6
- **Forms**: Formik + Yup validation
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Navbar, Footer, Button)
│   ├── landing/         # Landing page components
│   ├── estimator/       # Estimation form components
│   ├── shop/           # E-commerce components
│   └── cart/           # Shopping cart components
├── pages/
│   ├── admin/          # Admin dashboard pages
│   ├── Landing.jsx     # Home page
│   ├── Estimator.jsx   # Store estimation tool
│   ├── Shop.jsx        # Product catalog
│   ├── Cart.jsx        # Shopping cart
│   └── Checkout.jsx    # Order checkout
├── context/
│   └── CartContext.jsx # Global cart state management
├── utils/
│   ├── storeCalculator.js    # Fixture calculation logic
│   ├── pricingCalculator.js  # Pricing and GST calculations
│   └── estimateFormatter.js  # Excel export formatting
├── data/
│   └── products.js     # Product catalog data
└── styles/
    └── global.css      # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arijit-06/nue.git
   cd nue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Key Features Explained

### Store Calculator
- Calculates fixtures based on retail industry standards
- Supports different store types with specific multipliers
- Includes gondolas, wall racks, podiums, and cash counters
- Factors in aisle space and safety regulations

### Pricing Engine
- Per-square-foot pricing for branding products
- City-tier based logistics multipliers
- 18% GST calculation
- Campaign and seasonal pricing adjustments

### E-commerce Flow
1. Browse products by category
2. Customize dimensions and upload artwork
3. Add to cart with real-time price calculation
4. Secure checkout with order confirmation
5. Admin order management and fulfillment

### Authentication & Authorization
- Email/password registration and login
- Protected routes for checkout and admin areas
- Role-based access (user/admin)
- Persistent authentication state

## 🎨 Design System

- **Colors**: Bootstrap 5 primary palette
- **Typography**: System font stack for optimal performance
- **Layout**: Responsive grid system (mobile-first)
- **Components**: Consistent Bootstrap component usage
- **Icons**: Bootstrap Icons and emoji for visual elements

## 📱 Responsive Design

- **Mobile**: Single column layout, touch-friendly interactions
- **Tablet**: Two-column layouts, optimized for touch
- **Desktop**: Full multi-column layouts with hover states

## 🔐 Security Features

- Form validation on client and server side
- Protected routes with authentication checks
- Role-based access control for admin features
- Secure file upload handling

## 🚀 Deployment

### 🌐 Live Application
**Production URL**: [https://nue-two.vercel.app/](https://nue-two.vercel.app/)

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Arijit
- **Project**: NEU Store Branding Portal
- **Repository**: [github.com/arijit-06/nue](https://github.com/arijit-06/nue)

## 🔮 Future Enhancements

- Firebase integration for real-time data
- Payment gateway integration
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- Advanced file management system

---

**NEU** - Transforming stores, building brands, creating success. 🏪✨