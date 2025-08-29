import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Smart Recipe Generator. Crafted with AI for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;