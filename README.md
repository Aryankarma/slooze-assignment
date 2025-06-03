# FoodieHub - Role-Based Food Ordering Application

A comprehensive food ordering application built with Next.js featuring role-based access control (RBAC) and regional data filtering.

## 🚀 Features

### Core Functionality
- **Restaurant & Menu Browsing**: View restaurants and menu items with rich details
- **Shopping Cart**: Add items to cart with quantity management
- **Order Management**: Place, view, and cancel orders
- **Payment Methods**: Manage payment methods (Admin only)

### Role-Based Access Control (RBAC)
- **Admin (Nick Fury)**: Full access to all features
- **Manager (Captain Marvel, Captain America)**: Can view, create orders, place orders, and cancel orders
- **Member (Thanos, Thor, Travis)**: Can only view restaurants and add items to cart

### Regional Access Control
- **India Region**: Users can only access India-based restaurants and data
- **America Region**: Users can only access America-based restaurants and data

## 👥 Demo Users

| User | Email | Role | Region | Password |
|------|-------|------|--------|----------|
| Nick Fury | nick.fury@shield.com | Admin | America | password123 |
| Captain Marvel | captain.marvel@shield.com | Manager | India | password123 |
| Captain America | captain.america@shield.com | Manager | America | password123 |
| Thanos | thanos@shield.com | Member | India | password123 |
| Thor | thor@shield.com | Member | India | password123 |
| Travis | travis@shield.com | Member | America | password123 |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: Custom auth provider with localStorage

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd foodie-hub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Access Control Matrix

| Function | Admin | Manager | Member |
|----------|-------|---------|--------|
| View restaurants & menu items | ✅ | ✅ | ✅ |
| Create order (add food items) | ✅ | ✅ | ✅ |
| Place order (checkout & pay) | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Update payment method | ✅ | ❌ | ❌ |

## 🌍 Regional Data Access

- **India Users**: Can only see restaurants and data from India
- **America Users**: Can only see restaurants and data from America
- Cross-region access is automatically blocked

## 🎨 UI Features

- **Colorful Design**: Gradient backgrounds and vibrant colors
- **Interactive Elements**: Hover effects, animations, and transitions
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Regional Theming**: Different color schemes for India and America
- **Accessibility**: Proper ARIA labels and semantic HTML

## 📱 Pages & Components

### Pages
- **Login Page**: Authentication with demo user selection
- **Dashboard**: Restaurant listing with regional filtering
- **Restaurant Detail**: Menu items with add to cart functionality
- **Cart**: Shopping cart with quantity management and checkout
- **Orders**: Order history with status tracking and cancellation
- **Payment Methods**: Payment method management (Admin only)

### Key Components
- **AuthProvider**: Handles authentication and user context
- **CartProvider**: Manages shopping cart state
- **Navbar**: Navigation with role-based menu items
- **RestaurantCard**: Restaurant display with ratings and info
- **MenuItemCard**: Menu item display with add to cart
- **OrderCard**: Order display with status and actions

## 🔒 Security Features

- **Role-based route protection**
- **Regional data filtering**
- **Permission checks for sensitive actions**
- **Secure authentication flow**

## 🚀 Deployment

The application can be deployed to Vercel, Netlify, or any platform supporting Next.js:

\`\`\`bash
npm run build
npm start
\`\`\`

## 📊 Mock Data

The application uses comprehensive mock data including:
- 6 restaurants (3 in India, 3 in America)
- 10+ menu items across different categories
- User profiles with different roles and regions
- Payment methods and order history

## 🎯 Future Enhancements

- Real database integration
- Payment gateway integration
- Real-time order tracking
- Push notifications
- Admin dashboard for restaurant management
- Advanced filtering and search
- User reviews and ratings

## 📄 License

This project is created for demonstration purposes as part of a take-home assignment.
